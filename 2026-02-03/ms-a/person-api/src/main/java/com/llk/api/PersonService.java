package com.llk.api;
import com.llk.api.Person;

public interface PersonService {
    void update(Person person);
    void create(Person person);
    void delete(int id);
}
