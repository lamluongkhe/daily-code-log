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
    public void create(Person person) {
        kafkaProducer.sendCreate(person);
    }

    @Override
    public void update(Person person) {
        kafkaProducer.sendUpdate(person);
    }

    @Override
    public void delete(int id) {
        Person person = new Person();
        person.setId(id);
        kafkaProducer.sendDelete(person);
    }

}
