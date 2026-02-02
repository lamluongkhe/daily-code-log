package com.llk.rest;

import com.llk.api.Person;
import com.llk.api.PersonService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Produces(MediaType.APPLICATION_JSON)
public class PersonRest {

    private PersonService personService;


    public PersonRest(PersonService personService) {
        this.personService = personService;
    }

    @GET
    @Path("/{id}")
    public Person getById(@PathParam("id") int id) {
        return personService.getById(id);
    }

    @POST
    public void create(Person person) {
        personService.create(person);
    }

}
