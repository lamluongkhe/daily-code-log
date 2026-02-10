FROM docker.io/maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /workspace
COPY . .
RUN mvn -q -DskipTests -pl person-feature-b -am clean install

FROM apache/karaf:4.4.6

COPY --from=build /workspace/person-feature-b/target/person-feature-b-1.0-SNAPSHOT.kar /opt/apache-karaf/deploy/
COPY ./etc/*.cfg /opt/apache-karaf/etc/

EXPOSE 8181 8101
CMD ["karaf", "run"]
