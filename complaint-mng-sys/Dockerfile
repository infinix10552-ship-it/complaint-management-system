# Multi-stage Dockerfile for Render
# Build with Maven (uses project's wrapper if present)
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . /app
# Use the wrapper if present to ensure consistent Maven version
RUN if [ -f ./mvnw ]; then chmod +x ./mvnw && ./mvnw -B -DskipTests package; else mvn -B -DskipTests package; fi

# Use a small JRE image to run the app
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# Let Render (or other platforms) set the port via $PORT env var; default to 8080
ENTRYPOINT ["sh","-c","java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]
