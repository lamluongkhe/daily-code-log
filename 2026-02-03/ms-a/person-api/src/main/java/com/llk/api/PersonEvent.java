package com.llk.api;

import com.llk.api.Person;

public class PersonEvent {

    private String type;   // UPDATE
    private Person person;

    public PersonEvent() {}

    public PersonEvent(String type, Person person) {
        this.type = type;
        this.person = person;
    }

    public String getType() { return type; }
    public Person getPerson() { return person; }
}
