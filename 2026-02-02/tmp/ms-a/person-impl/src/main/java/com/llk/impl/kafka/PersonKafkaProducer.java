package com.llk.impl.kafka;

import com.google.gson.Gson;
import com.llk.api.Person;
import com.llk.api.PersonEvent;



import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

public class PersonKafkaProducer {

    private KafkaProducer<String, String> producer;
    private final Gson gson = new Gson();

    public void init() {
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");

        producer = new KafkaProducer<>(props);
        System.out.println("Kafka Producer INIT OK");
    }

    public void sendUpdate(Person person) {
        PersonEvent event = new PersonEvent("UPDATE", person);
        String json = gson.toJson(event);

        ProducerRecord<String, String> record =
                new ProducerRecord<>("person-events",
                        String.valueOf(person.getId()),
                        json);

        producer.send(record);
        System.out.println("SEND UPDATE EVENT: " + json);
    }
}
