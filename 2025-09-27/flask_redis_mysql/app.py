from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_session import Session
import mysql.connector
from mysql.connector import pooling
from datetime import datetime
import os
import redis
import time
import json   # ✅ để lưu user dạng JSON

app = Flask(__name__)
app.secret_key = 'odfhgdfgjkjbsdfkvnjsdfn'

# ---- MySQL Config ----
dbconfig = {
    "host": os.getenv("MYSQL_HOST"),
    "user": os.getenv("MYSQL_USER"),
    "password": os.getenv("MYSQL_PASSWORD"),
    "database": os.getenv("MYSQL_DATABASE")
}

cnxpool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **dbconfig)

# ---- Redis Config ----
redis_host = os.getenv("REDIS_HOST")
redis_port = int(os.getenv("REDIS_PORT"))
redis_db = int(os.getenv("REDIS_DB"))

cache = redis.Redis(host=redis_host, port=redis_port, db=redis_db)

# ---- Routes ----
@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        # ---- Check Redis trước ----
        redis_start = time.perf_counter()
        cached_user = cache.get(f"user:{username}")
        redis_end = time.perf_counter()
        redis_duration = round(redis_end - redis_start, 6)

        if cached_user:
            user_data = json.loads(cached_user.decode("utf-8"))
            if user_data["password"] == password:   # ✅ check password trong Redis
                session["username"] = username
                session["login_time"] = user_data["login_time"]
                session["mysql_duration"] = "0"     # không query MySQL
                session["redis_duration"] = redis_duration
                session["source"] = "Redis"
                return redirect(url_for("welcome"))
            else:
                return "Sai mật khẩu (Redis)!"

        # ---- Nếu Redis không có thì query MySQL ----
        mysql_start = time.perf_counter()
        try:
            conn = cnxpool.get_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
            user = cursor.fetchone()
            cursor.close()
            conn.close()
        except Exception as e:
            return f"Lỗi MySQL: {e}"
        mysql_end = time.perf_counter()
        mysql_duration = round(mysql_end - mysql_start, 6)

        if user:
            login_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            session["username"] = username
            session["login_time"] = login_time
            session["mysql_duration"] = mysql_duration
            session["redis_duration"] = "0"
            session["source"] = "MySQL"

            # ✅ Lưu vào Redis (cache 60s)
            cache.set(
                f"user:{username}",
                json.dumps({"password": password, "login_time": login_time}),
                ex=60
            )

            return redirect(url_for("welcome"))
        else:
            return "Sai tên đăng nhập hoặc mật khẩu!"

    return render_template("login.html")


@app.route("/welcome")
def welcome():
    if "username" not in session:
        return redirect(url_for("login"))

    return render_template(
        "welcome.html",
        username=session["username"],
        login_time=session["login_time"],
        mysql_duration=session.get("mysql_duration"),
        redis_duration=session.get("redis_duration"),
        source=session.get("source")
    )


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


# ---- Benchmark Routes ----
@app.route("/test/mysql")
def test_mysql():
    start = time.perf_counter()
    try:
        conn = cnxpool.get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, username, password FROM users")  # ✅ lấy tất cả
        users = cursor.fetchall()
        cursor.close()
        conn.close()
    except Exception as e:
        return {"error": f"Lỗi MySQL: {e}"}

    duration = round(time.perf_counter() - start, 6)
    return {
        "source": "MySQL",
        "count": len(users),   # số lượng user
        "duration": duration,  # thời gian query
        "users": users         # ✅ in ra hết user dạng JSON
    }


@app.route("/test/redis")
def test_redis():
    """Test lấy toàn bộ user từ Redis (cache 60s)"""
    start = time.perf_counter()
    data = cache.get("all_users")

    if data:
        users = json.loads(data.decode("utf-8"))
        source = "Redis"
    else:
        try:
            conn = cnxpool.get_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT username FROM users")
            users = [row["username"] for row in cursor.fetchall()]
            cursor.close()
            conn.close()
        except Exception as e:
            return jsonify({"error": str(e)})

        cache.set("all_users", json.dumps(users), ex=60)  # cache 60s
        source = "MySQL -> Redis"

    elapsed = round(time.perf_counter() - start, 6)
    return jsonify({
        "count": len(users),
        "time_redis": elapsed,
        "source": source
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
