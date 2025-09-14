FROM mariadb:10.11

# Copy script init vào thư mục docker-entrypoint-initdb.d
COPY init.sql /docker-entrypoint-initdb.d/

# Set biến môi trường để MySQL tạo DB và user khi container start
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=flask_login_demo
ENV MYSQL_USER=kheuser
ENV MYSQL_PASSWORD=123

