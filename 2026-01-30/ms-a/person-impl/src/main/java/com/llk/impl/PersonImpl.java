package com.llk.impl;

import com.llk.api.Person;
import com.llk.api.PersonService;
import redis.clients.jedis.Jedis;

import java.util.Map;
import java.util.HashMap;


public class PersonImpl implements PersonService {

    private Jedis jedis;

    public void setJedis(Jedis jedis) {
        this.jedis = jedis;
    }

    @Override
    public Person getById(int id) {
        String redisKey = "person:" + id;

        if (!jedis.exists(redisKey)) {
            return null;
        }

        Map<String, String> map = jedis.hgetAll(redisKey);

        return new Person(
                Integer.parseInt(map.get("id")),
                map.get("name"),
                Integer.parseInt(map.get("age"))
        );
    }

    @Override
    public void create(Person person) {
        String redisKey = "person:" + person.getId();

        Map<String, String> map = new HashMap<>();
        map.put("id", String.valueOf(person.getId()));
        map.put("name", person.getName());
        map.put("age", String.valueOf(person.getAge()));

        jedis.hset(redisKey, map);
    }


}
