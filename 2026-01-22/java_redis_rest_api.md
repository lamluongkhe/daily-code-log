# 🎯 Mục tiêu
Build **Java REST API** (Jersey) chạy trên host, **GET Person từ Redis (Docker)**.

---

# 🧠 Tổng thể Flow

1. **Redis chạy trong Docker**
   - Lưu dữ liệu dạng HASH: `person:{id}`
2. **Java app (host)**
   - Dùng **Jersey + JDK Http Server**
   - Gọi Redis qua `Jedis`
3. **Client (curl)**
   - Gọi API `GET /person/{id}`
   - Dùng `--noproxy` để tránh proxy nội bộ

```
curl --> Java REST API --> Redis Docker --> Java --> JSON Response
```

---

# 📁 Cấu trúc thư mục

```
java-redis/
└── src/main/java/com/example/
    ├── Main.java
    ├── Person.java
    ├── PersonResource.java
    └── RedisService.java
```

---

# 🧩 Code chi tiết

## 1️⃣ Main.java – Start HTTP Server
```java
package com.example;

import org.glassfish.jersey.jdkhttp.JdkHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.net.URI;

public class Main {
    public static void main(String[] args) {
        ResourceConfig config = new ResourceConfig();
        config.register(PersonResource.class);

        JdkHttpServerFactory.createHttpServer(
                URI.create("http://0.0.0.0:8080/"),
                config
        );

        System.out.println("Server started at http://localhost:8080");
    }
}
```

---

## 2️⃣ Person.java – Entity
```java
package com.example;

public class Person {
    public int id;
    public String name;
    public int age;

    public Person() {}

    public Person(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}
```

---

## 3️⃣ RedisService.java – Làm việc với Redis
```java
package com.example;

import redis.clients.jedis.Jedis;
import java.util.Map;

public class RedisService {

    private static final String REDIS_HOST = "localhost";
    private static final int REDIS_PORT = 6379;

    public Person getPerson(int id) {
        try (Jedis jedis = new Jedis(REDIS_HOST, REDIS_PORT)) {
            String key = "person:" + id;
            Map<String, String> data = jedis.hgetAll(key);

            if (data == null || data.isEmpty()) return null;

            return new Person(
                    Integer.parseInt(data.get("id")),
                    data.get("name"),
                    Integer.parseInt(data.get("age"))
            );
        }
    }
}
```

---

## 4️⃣ PersonResource.java – REST API
```java
package com.example;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/person")
public class PersonResource {

    private final RedisService redisService = new RedisService();

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPerson(@PathParam("id") int id) {
        Person person = redisService.getPerson(id);

        if (person == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Person not found")
                    .build();
        }

        return Response.ok(person).build();
    }
}
```

---

# 🧪 Redis dữ liệu mẫu

```bash
redis-cli

HSET person:1 id 1 name Luke age 33
```

---

# 🧪 Test API

```bash
curl --noproxy "*" http://localhost:8080/person/1
```

Expected:
```json
{"id":1,"name":"Luke","age":33}
```

---

# ⚠️ Các lỗi thường gặp & cách fix

## ❌ 1. MessageBodyWriter not found
**Nguyên nhân:** Thiếu Jackson

✅ Fix:
```xml
jersey-media-json-jackson
```

---

## ❌ 2. InjectionManagerFactory not found
**Nguyên nhân:** Thiếu HK2 (DI của Jersey)

✅ Fix:
```xml
jersey-hk2
```

---

## ❌ 3. curl treo / lỗi proxy
**Nguyên nhân:** Môi trường có proxy

✅ Fix:
```bash
curl --noproxy "*" http://localhost:8080/person/1
```

---

## ❌ 4. Redis không liên quan lỗi JSON
Redis HASH **KHÔNG ẢNH HƯỞNG** tới JSON response.
Lỗi JSON là do Java serialize, **không phải Redis**.

---

# 🏁 Tổng kết cho Final Exam

- Redis: HASH (`HSET / HGETALL`)
- Java: Jersey + Jedis
- REST: `@GET /person/{id}`
- Test: curl no-proxy

👉 Đây là **flow chuẩn đi thi & đi làm**.

