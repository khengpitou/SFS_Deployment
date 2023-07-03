# School Feedback System

## Requirement:

- IntelliJ Idea
- [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Apache Maven](https://dlcdn.apache.org/maven/maven-3/3.9.2/source/apache-maven-3.9.2-src.zip)
- Docker

## Setting up Database

- Run Docker and set up local [MSQL Database](https://www.youtube.com/watch?v=kphq2TsVRIs&t=406s)
- Remember your login credential to Database
- Go to **application.properties** inside `src/main/resources/`
- Configure

```
spring.datasrouce.url=jdbc:mysql://localhost:3306/YOUR_DATABASE_NAME?user=root&password=secret
spring.datasource.name=root
spring.datasrouce.password=YOUR_DATABASE_PASSWORD
```

## Running Project

- Check if `mvn --help` is running correctly
- Check if JDK 17 is installed correctly

To run the project, open it in IntelliJ Idea, Open **pom.xml** and reload using `mvn clean install` then click on Run Project inside IntelliJ Idea

**Author: Sambath Vatana**
