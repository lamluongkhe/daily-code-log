package com.llk.rest;

import com.llk.api.Person;
import com.llk.api.PersonEventProducer;
import com.llk.api.PersonService;
import com.llk.impl.kafka.PersonKafkaProducer;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PersonRest {

    private PersonService personService;
    private PersonEventProducer kafkaProducer;

    public void setPersonService(PersonService personService) {
        this.personService = personService;
    }

    public void setKafkaProducer(PersonEventProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PUT
    public Response update(Person person) {
//        personService.update(person);
        kafkaProducer.sendUpdate(person);
        System.out.println("Send thanh cong...");
        return Response.accepted().build();
    }
}