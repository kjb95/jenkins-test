FROM openjdk:8-jre-slim
WORKDIR /app
COPY backend/build/libs/backend-0.0.1-SNAPSHOT.jar /app/app.jar
CMD ["java", "-jar", "app.jar"]