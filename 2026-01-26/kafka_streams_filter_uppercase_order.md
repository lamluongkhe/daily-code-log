# Kafka Streams – Filter Order + Uppercase (Simple App)

---

## 1️⃣ FLOW TỔNG THỂ (NHÌN TRƯỚC – CHƯA GIẢI THÍCH)

```
[ Order Producer ]
        |
        v
   topic: orders
        |
        v
+----------------------+
|  Kafka Streams App   |
|----------------------|
| stream("orders")     |
|   -> filter(...)     |  (chỉ giữ ORDER)
|   -> mapValues(...)  |  (IN HOA value)
|   -> to("orders-filtered")
+----------------------+
        |
        v
 topic: orders-filtered
        |
        v
[ Result Consumer ]  (in ra ORDER ĐÃ IN HOA)
```

---

## 2️⃣ CẤU TRÚC PROJECT (GIỐNG CÁI BẠN ĐANG LÀM)

```
kafka-streams-app/
│
├── pom.xml
└── src/
    └── main/
        └── java/
            └── com/example/streams/
                └── OrderStreamApp.java
```

---

## 3️⃣ CODE KAFKA STREAMS (FILTER + IN HOA)

### 📄 `OrderStreamApp.java`

```java
package com.example.streams;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.KStream;

import java.util.Properties;

public class OrderStreamApp {

    public static void main(String[] args) {

        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "order-stream-app");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        StreamsBuilder builder = new StreamsBuilder();

        KStream<String, String> orders = builder.stream("orders");

        orders
            // CHỈ GIỮ ORDER
            .filter((key, value) -> value != null && value.startsWith("order"))

            // IN HOA VALUE
            .mapValues(value -> value.toUpperCase())

            // GHI SANG TOPIC MỚI
            .to("orders-filtered");

        KafkaStreams streams = new KafkaStreams(builder.build(), props);
        streams.start();

        Runtime.getRuntime().addShutdownHook(new Thread(streams::close));
    }
}
```

---

## 4️⃣ TEST PRODUCER (GỬI DATA VÀO)

### 🧪 Tạo topic (nếu chưa có)

```bash
kafka-topics.sh --bootstrap-server localhost:9092 \
  --create --topic orders --partitions 1 --replication-factor 1

kafka-topics.sh --bootstrap-server localhost:9092 \
  --create --topic orders-filtered --partitions 1 --replication-factor 1
```

### 🧪 Produce message

```bash
kafka-console-producer.sh --bootstrap-server localhost:9092 --topic orders
```

Nhập:
```
order_1
order_2
payment_1
order_hello
```

---

## 5️⃣ TEST CONSUMER (SAU KHI FILTER)

```bash
kafka-console-consumer.sh \
  --bootstrap-server localhost:9092 \
  --topic orders-filtered \
  --from-beginning
```

### 👉 KẾT QUẢ THẤY

```
ORDER_1
ORDER_2
ORDER_HELLO
```

❌ `payment_1` **KHÔNG XUẤT HIỆN** (đã bị filter)

---

## 6️⃣ GIẢI THÍCH NGẮN GỌN (SAU KHI ĐÃ NHÌN FLOW + CODE)

| Bước | Ý nghĩa |
|----|--------|
| `stream("orders")` | Đọc dữ liệu liên tục từ topic `orders` |
| `filter(...)` | Chỉ giữ message bắt đầu bằng `order` |
| `mapValues(...)` | Biến đổi value sang chữ IN HOA |
| `to("orders-filtered")` | Ghi kết quả sang topic mới |

---

## 7️⃣ TƯ DUY QUAN TRỌNG

- Kafka Streams **KHÔNG gọi poll** như Consumer thường
- Mỗi message đi qua pipeline **từng bước một**
- Streams App = **Service xử lý data realtime**

---

Nếu bạn muốn:
- ➡️ `branch()` (chia ORDER / PAYMENT)
- ➡️ `groupBy + count`
- ➡️ Streams vs Consumer thường (so sánh cực dễ hiểu)

👉 chỉ cần nói **"tiếp theo ..."**

