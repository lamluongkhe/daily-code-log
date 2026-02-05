FROM apache/karaf:4.4.6

WORKDIR /opt/karaf

COPY person-api/target/person-api-1.0.0-SNAPSHOT.jar deploy/
COPY person-impl/target/person-impl-1.0.0-SNAPSHOT.jar deploy/
COPY person-rest/target/person-rest-1.0.0-SNAPSHOT.jar deploy/

COPY person-feature/target/person-feature-1.0.0-SNAPSHOT.xml deploy/

EXPOSE 8181

CMD ["bin/karaf", "run"]

