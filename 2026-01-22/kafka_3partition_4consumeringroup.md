# 🎯 Kafka Consumer Group – Flow + Code + Giải thích từng bước (RẤT CHI TIẾT)

Tài liệu này giúp bạn **hiểu bản chất Kafka Consumer Group**, vì sao:
- 3 partition + 4 consumer
- Có consumer dư
- Kill 1 consumer nhưng consumer khác **không nhận lại message cũ**

---

## 1️⃣ Mục tiêu bài lab

Chúng ta tái hiện đúng kịch bản:

- Topic: `orders`
- Partitions: **3**
- Consumer Group: `order-group`
- Consumers: **4** (C1, C2, C3, C4)

Mục tiêu quan sát:
- Mỗi partition chỉ có **1 consumer đọc**
- Consumer thứ 4 bị **idle**
- Kill 1 consumer → partition được **reassign**
- Consumer mới **chỉ đọc message MỚI**

---

## 2️⃣ Kiến trúc tổng thể (FLOW TỔNG)

```
Producer
   │
   ▼
Kafka Topic: orders (3 partitions)
   │
   ▼
Consumer Group: order-group
   ├─ C1 → partition 0
   ├─ C2 → partition 1
   ├─ C3 → partition 2
   └─ C4 → idle
```

👉 **Quy tắc cứng của Kafka**:
> 1 partition chỉ được **1 consumer trong group** xử lý tại 1 thời điểm

---

## 3️⃣ Tạo topic 3 partitions

```bash
kafka-topics.sh \
 --bootstrap-server localhost:9092 \
 --create \
 --topic orders \
 --partitions 3 \
 --replication-factor 1
```

Kiểm tra:
```bash
kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic orders
```

---

## 4️⃣ Producer – gửi message vào topic

### 📂 File
```
src/main/java/com/example/kafka/OrderProducer.java
```

### 📄 Code
```java
package com.example.kafka;

import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

public class OrderProducer {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

        Producer<String, String> producer = new KafkaProducer<>(props);

        for (int i = 1; i <= 12; i++) {
            ProducerRecord<String, String> record =
                    new ProducerRecord<>("orders", "order-" + i);
            producer.send(record);
        }

        producer.close();
        System.out.println("Producer sent messages");
    }
}
```

### 🔍 Giải thích
- Không chỉ định partition → Kafka **tự hash & phân phối**
- Message được rải đều vào 3 partition

---

## 5️⃣ Consumer – tham gia Consumer Group

### 📂 File
```
src/main/java/com/example/kafka/OrderConsumer.java
```

### 📄 Code
```java
package com.example.kafka;

import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.serialization.StringDeserializer;

import java.time.Duration;
import java.util.Collections;
import java.util.Properties;

public class OrderConsumer {
    public static void main(String[] args) {
        String consumerName = args.length > 0 ? args[0] : "UNKNOWN";

        Properties props = new Properties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "order-group");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
        consumer.subscribe(Collections.singletonList("orders"));

        System.out.println("Consumer " + consumerName + " started");

        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(1000));
            for (ConsumerRecord<String, String> record : records) {
                System.out.printf(
                        "Consumer=%s | partition=%d | offset=%d | value=%s%n",
                        consumerName,
                        record.partition(),
                        record.offset(),
                        record.value()
                );
            }
        }
    }
}
```

---

## 6️⃣ Chạy 4 consumer

Mở **4 terminal**:

```bash
mvn exec:java -Dexec.mainClass=com.example.kafka.OrderConsumer -Dexec.args=C1
mvn exec:java -Dexec.mainClass=com.example.kafka.OrderConsumer -Dexec.args=C2
mvn exec:java -Dexec.mainClass=com.example.kafka.OrderConsumer -Dexec.args=C3
mvn exec:java -Dexec.mainClass=com.example.kafka.OrderConsumer -Dexec.args=C4
```

### 🔍 Kết quả mong đợi

```
C1 → partition 0
C2 → partition 1
C3 → partition 2
C4 → KHÔNG NHẬN GÌ
```

👉 Vì **chỉ có 3 partition**

---

## 7️⃣ Kill 1 consumer (ví dụ C2)

- C2 chết
- Kafka **rebalance**
- Partition 1 → gán cho C4

### ❗ Nhưng tại sao C4 KHÔNG NHẬN MESSAGE CŨ?

### 🔑 LÝ DO CỐT LÕI

Kafka **KHÔNG gửi lại message đã commit**

```
partition 1:
  offset hiện tại = 12
  log-end-offset = 12
→ không còn message mới
```

➡️ C4 nhận partition
➡️ Nhưng **không có message để đọc**

👉 Đây là hành vi **CHUẨN của Kafka**

---

## 8️⃣ Khi nào C4 SẼ nhận?

### ✅ Cách ĐÚNG (Production)

👉 **Gửi message mới**

```bash
mvn exec:java -Dexec.mainClass=com.example.kafka.OrderProducer
```

➡️ C4 nhận message mới của partition 1

---

### ⚠️ Cách học (Reset offset)

```bash
kafka-consumer-groups.sh \
 --bootstrap-server localhost:9092 \
 --group order-group \
 --topic orders \
 --reset-offsets \
 --to-earliest \
 --execute
```

➡️ Consumer đọc lại từ đầu

---

## 9️⃣ Kiến thức cốt lõi cần nhớ (RẤT QUAN TRỌNG)

| Khái niệm | Ý nghĩa |
|---------|--------|
| Consumer Group | Load balancing |
| Partition | Đơn vị song song |
| Offset | Vị trí đã đọc |
| Commit offset | Kafka nhớ bạn đọc tới đâu |
| Consumer dư | Idle |
| Kill consumer | Không làm message quay lại |

---

## 🔚 KẾT LUẬN

- Kafka **KHÔNG broadcast trong cùng group**
- Kafka **KHÔNG replay message đã commit**
- Failover chỉ áp dụng cho **message mới**

👉 Đây chính là nền tảng của:
- Microservice
- Event-driven
- Exactly-once / At-least-once

---

Nếu bạn muốn, bước tiếp theo có thể là:
- Consumer **pub-sub (mỗi consumer đều nhận)**
- Manual commit & retry
- RebalanceListener
- Kafka Streams
- Kafka so sánh với RabbitMQ

