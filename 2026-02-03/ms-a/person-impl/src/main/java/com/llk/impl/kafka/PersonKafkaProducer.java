package com.llk.impl.kafka;

import com.google.gson.Gson;
import com.llk.api.Person;
import com.llk.api.PersonEvent;
import com.llk.api.PersonEventProducer;


import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

public class PersonKafkaProducer implements PersonEventProducer{

    private KafkaProducer<String, String> producer;
    private final Gson gson = new Gson();

    public void init() {
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);

        producer = new KafkaProducer<>(props);
        System.out.println("Kafka Producer INIT OK");
    }

    public void destroy() {
        if (producer != null) producer.close();
    }

    @Override
    public void sendUpdate(Person person) {
        PersonEvent event = new PersonEvent("UPDATE", person);
        producer.send(new ProducerRecord<>(
                "person-events",
                String.valueOf(person.getId()),
                gson.toJson(event)
        ));
    }

}
