FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app

COPY --from=build /app/target/JavaService-0.0.1-SNAPSHOT.jar /app/javaservice.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "javaservice.jar"]
