FROM docker.io/maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /workspace
COPY . .
RUN mvn -q clean install -DskipTests


FROM apache/karaf:4.4.6

COPY --from=build /root/.m2 /root/.m2

RUN echo "featuresRepositories = \
mvn:org.apache.karaf.features/standard/4.4.6/xml/features,\
mvn:com.llk/person-feature/1.0-SNAPSHOT/xml/features" \
>> /opt/apache-karaf/etc/org.apache.karaf.features.cfg \
&& echo "featuresBoot = person-feature" \
>> /opt/apache-karaf/etc/org.apache.karaf.features.cfg

EXPOSE 8181 8101
CMD ["karaf", "run"]

