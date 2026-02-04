package com.llk.restB;

import com.llk.apiB.Person;
import com.llk.apiB.PersonService;

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
    public Response get(@PathParam("id") int id) {
        Person p = personService.getById(id);
        if (p == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(p).build();
    }

    @POST
    public Response create(Person person) {
        personService.create(person);
        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    public Response update(Person person) {
        personService.update(person);
        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") int id) {
        personService.delete(id);
        return Response.noContent().build();
    }

}
