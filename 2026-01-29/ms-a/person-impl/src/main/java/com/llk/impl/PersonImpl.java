package com.llk.impl;

import com.llk.api.Person;

public class PersonImpl implements Person {
    @Override
    public String hello(String name) {
        return "Hello, " + name + "!";
    }
}
