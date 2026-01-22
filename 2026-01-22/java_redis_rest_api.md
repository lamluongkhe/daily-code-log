# 1. CẤU TRÚC THƯ MỤC (GIỮ NGUYÊN)

```text
java-redis/
├── java-redis/
│   ├── pom.xml
│   └── src/
│       └── main/
│           └── java/
│               └── com/example/
│                   ├── Main.java
│                   ├── Person.java
│                   ├── PersonResource.java
│                   └── RedisService.java
│
└── redis-docker/
    └── docker-compose.yml
```

---
# 2. DOCKER REDIS

**redis-docker/docker-compose.yml**
```yaml
version: "2.2"

services:
  redis:
    image: redis/redis-stack:latest
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - ./data:/data
    restart: always
```

Chạy Redis:
```bash
cd redis-docker
docker compose up -d
```

Test Redis:
```bash
docker exec -it redis redis-cli
HSET person:1 id 1 name "John" age 30
HGETALL person:1
```

---
# 3. CODE JAVA (GIỮ NGUYÊN TÊN FILE)

## 3.1 Main.java
```java
package com.example;

import org.glassfish.jersey.jdkhttp.JdkHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.net.URI;

public class Main {
    public static void main(String[] args) {
        ResourceConfig config = new ResourceConfig();
        config.packages("com.example");

        JdkHttpServerFactory.createHttpServer(
                URI.create("http://0.0.0.0:8080/"),
                config
        );

        System.out.println("Server started at http://localhost:8080");
    }
}
```

---
## 3.2 Person.java
```java
package com.example;

public class Person {

    private int id;
    private String name;
    private int age;

    public Person() {}

    public Person(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

---
## 3.3 RedisService.java
```java
package com.example;

import redis.clients.jedis.Jedis;

import java.util.Map;

public class RedisService {

    private static final Jedis jedis = new Jedis("localhost", 6379);

    public static Map<String, String> getPersonById(String id) {
        return jedis.hgetAll("person:" + id);
    }
}
```

---
## 3.4 PersonResource.java
```java
package com.example;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;

@Path("/person")
public class PersonResource {

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPerson(@PathParam("id") String id) {

        Map<String, String> data = RedisService.getPersonById(id);

        if (data == null || data.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Person not found")
                    .build();
        }

        Person person = new Person(
                Integer.parseInt(data.get("id")),
                data.get("name"),
                Integer.parseInt(data.get("age"))
        );

        return Response.ok(person).build();
    }
}
```

---
# 4. pom.xml (GIỮ TRONG java-redis/java-redis)

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>java-redis</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <jersey.version>2.39</jersey.version>
    </properties>

    <dependencies>

        <dependency>
            <groupId>org.glassfish.jersey.core</groupId>
            <artifactId>jersey-server</artifactId>
            <version>${jersey.version}</version>
        </dependency>

        <dependency>
            <groupId>org.glassfish.jersey.containers</groupId>
            <artifactId>jersey-container-jdk-http</artifactId>
            <version>${jersey.version}</version>
        </dependency>

        <dependency>
            <groupId>org.glassfish.jersey.media</groupId>
            <artifactId>jersey-media-json-jackson</artifactId>
            <version>${jersey.version}</version>
        </dependency>

        <dependency>
            <groupId>org.glassfish.jersey.inject</groupId>
            <artifactId>jersey-hk2</artifactId>
            <version>${jersey.version}</version>
        </dependency>

        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>5.1.0</version>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
            </plugin>

            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>exec-maven-plugin</artifactId>
                <version>3.1.0</version>
                <configuration>
                    <mainClass>com.example.Main</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

---
# 5. CHẠY & TEST

```bash
cd java-redis/java-redis
mvn clean compile exec:java
```

Test API (NO PROXY):
```bash
curl --noproxy "*" http://localhost:8080/person/1
```

**Kết quả:**
```json
{"id":1,"name":"John","age":30}
```

---
# 6. FLOW BÀI THI (GIẢI THÍCH)

Client (curl)
→ Java REST API (Jersey @GET)
→ RedisService (Jedis)
→ Redis Hash (person:{id})
→ JSON Response

---
# 7. CÁC LỖI ĐÃ FIX

| Lỗi | Nguyên nhân | Fix |
|----|------------|-----|
| Source 5 not supported | Java quá cũ | compiler = 11 |
| ClassNotFound Main | Sai package | đúng com.example.Main |
| InjectionManagerFactory not found | thiếu hk2 | thêm jersey-hk2 |
| MessageBodyWriter not found | thiếu jackson | jersey-media-json-jackson |

---
✅ **ĐÚNG FORM FINAL EXAM – CHẠY ĐƯỢC – DỄ GIẢI THÍCH**

