package com.llk.api;

import com.llk.api.Person;

public class PersonEvent {

    public enum Type {
        UPDATE
    }

    private Type type;
    private Person person;

    public PersonEvent(String update, Person person) {}

    public PersonEvent(Type type, Person person) {
        this.type = type;
        this.person = person;
    }

    public Type getType() { return type; }
    public Person getPerson() { return person; }
}
