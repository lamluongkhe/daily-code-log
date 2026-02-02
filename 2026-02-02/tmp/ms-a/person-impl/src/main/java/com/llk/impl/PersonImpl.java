package com.llk.impl;

import com.llk.api.Person;
import com.llk.api.PersonService;
import com.llk.impl.kafka.PersonKafkaProducer;


public class PersonImpl implements PersonService {

    @Override
    public void update(Person person) {
        if (person == null) {
            throw new IllegalArgumentException("Person null");
        }
        if (person.getId() <= 0) {
            throw new IllegalArgumentException("Invalid id");
        }
        System.out.println("PersonService update OK: " + person.getId());
    }

}
