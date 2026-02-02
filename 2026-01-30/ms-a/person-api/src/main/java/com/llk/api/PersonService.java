package com.llk.api;

public interface PersonService {
    Person getById(int id);
    void create(Person person);
}
