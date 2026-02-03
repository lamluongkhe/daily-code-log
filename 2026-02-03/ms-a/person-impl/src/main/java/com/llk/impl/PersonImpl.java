package com.llk.impl;

import com.llk.api.Person;
import com.llk.api.PersonService;
import com.llk.impl.kafka.PersonKafkaProducer;


public class PersonImpl implements PersonService {

    private PersonKafkaProducer kafkaProducer;

    public void setKafkaProducer(PersonKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }
    @Override
    public void update(Person person) {
        if (person == null || person.getId() <= 0) return;

        System.out.println("Service updating: " + person.getName());
        if (kafkaProducer != null) {
            kafkaProducer.sendUpdate(person);
        }
    }

}
