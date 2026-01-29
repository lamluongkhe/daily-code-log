package com.llk.rest;

import com.llk.api.Person;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

public class PersonRest {
    private Person personService;

    public PersonRest(Person personService) {
        this.personService = personService;
    }

    @GET
    @Path("/hello/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    public String hello(@PathParam("name") String name) {
        return personService.hello(name);
    }
}
