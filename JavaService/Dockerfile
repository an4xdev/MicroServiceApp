## Use an official OpenJDK runtime as a parent image
#FROM openjdk:17-jdk-slim
#
## Set the working directory in the container
#WORKDIR /app
#
## Copy the project’s jar file into the container at /app
#COPY target/JavaService-0.0.1-SNAPSHOT.jar /app/javaservice.jar
#
## Make port 8080 available to the world outside this container
#EXPOSE 8080
#
## Run the jar file
#ENTRYPOINT ["java", "-jar", "javaservice.jar"]

# Stage 1: Budowanie aplikacji przy użyciu Mavena
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# Kopiowanie pliku pom.xml oraz katalogu src do obrazu
COPY pom.xml .
COPY src ./src

# Budowanie projektu (bez testów – jeśli chcesz, możesz je uruchomić)
RUN mvn clean package -DskipTests

# Stage 2: Uruchomienie aplikacji
FROM openjdk:17-jdk-slim
WORKDIR /app

# Kopiujemy zbudowany jar z poprzedniego etapu
COPY --from=build /app/target/JavaService-0.0.1-SNAPSHOT.jar /app/javaservice.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "javaservice.jar"]
