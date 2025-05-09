FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests -B

FROM eclipse-temurin:17-jre-alpine AS final
WORKDIR /app

RUN apk add --no-cache curl

COPY --from=build /app/target/JavaService-0.0.1-SNAPSHOT.jar /app/javaservice.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "javaservice.jar"]