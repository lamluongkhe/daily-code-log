# Kafka + Schema Registry – Full Flow, Code & Fixes

## 1. Overall Flow
Producer → Schema Registry → Kafka → Consumer

Producer serializes Avro, registers schema, sends to Kafka. Consumer fetches schema from Registry and deserializes.

## 2. Folder Structure
```
kafka-schema-lab/
├── docker/docker-compose.yml
├── avro/user.avsc
├── producer/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/producer/UserProducer.java
│       └── resources/user.avsc
└── consumer/
    ├── pom.xml
    └── src/main/java/com/example/consumer/UserConsumer.java
```

## 3. Avro Schema (user.avsc)
```json
{
  "type": "record",
  "name": "User",
  "namespace": "com.example.avro",
  "fields": [
    { "name": "id", "type": "int" },
    { "name": "name", "type": "string" }
  ]
}
```

## 4. Producer Code
```java
package com.example.producer;

import io.confluent.kafka.serializers.KafkaAvroSerializer;
import org.apache.avro.Schema;
import org.apache.avro.generic.*;
import org.apache.kafka.clients.producer.*;

import java.io.InputStream;
import java.util.Properties;

public class UserProducer {
    public static void main(String[] args) throws Exception {
        InputStream is = UserProducer.class.getClassLoader().getResourceAsStream("user.avsc");
        Schema schema = new Schema.Parser().parse(is);

        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
                "org.apache.kafka.common.serialization.StringSerializer");
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
                KafkaAvroSerializer.class.getName());
        props.put("schema.registry.url", "http://localhost:8081");

        KafkaProducer<String, GenericRecord> producer = new KafkaProducer<>(props);

        GenericRecord user = new GenericData.Record(schema);
        user.put("id", 1);
        user.put("name", "Luke");

        ProducerRecord<String, GenericRecord> record = new ProducerRecord<>("user-topic", user);

        producer.send(record, (meta, ex) -> {
            if (ex == null) {
                System.out.println("Sent to " + meta.topic() + " offset=" + meta.offset());
            } else ex.printStackTrace();
        });
        producer.flush();
        producer.close();
    }
}
```

## 5. Consumer Code
```java
package com.example.consumer;

import io.confluent.kafka.serializers.KafkaAvroDeserializer;
import org.apache.kafka.clients.consumer.*;
import java.time.Duration;
import java.util.*;

public class UserConsumer {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "user-group");
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
                "org.apache.kafka.common.serialization.StringDeserializer");
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                KafkaAvroDeserializer.class.getName());
        props.put("schema.registry.url", "http://localhost:8081");

        KafkaConsumer<String, Object> consumer = new KafkaConsumer<>(props);
        consumer.subscribe(List.of("user-topic"));

        while (true) {
            ConsumerRecords<String, Object> records = consumer.poll(Duration.ofSeconds(1));
            records.forEach(r -> System.out.println(r.value()));
        }
    }
}
```

## 6. Docker Compose
```yaml
version: '3.3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.6.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_LISTENERS: INTERNAL://0.0.0.0:29092,EXTERNAL://0.0.0.0:9092
      KAFKA_ADVERTISED_LISTENERS: INTERNAL://kafka:29092,EXTERNAL://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: INTERNAL
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  schema-registry:
    image: confluentinc/cp-schema-registry:7.6.0
    ports:
      - "8081:8081"
    environment:
      SCHEMA_REGISTRY_HOST_NAME: schema-registry
      SCHEMA_REGISTRY_LISTENERS: http://0.0.0.0:8081
      SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS: PLAINTEXT://kafka:29092
```

## 7. Common Errors & Fixes
- Java 5 source error → set compiler release 17
- UnknownHost kafka → use localhost:9092
- Producer timeout → fix advertised listeners
- Schema Registry cannot connect → use INTERNAL listener

---
This canvas is ready to download or print.

