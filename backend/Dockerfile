FROM openjdk:8-jre-slim
WORKDIR /app
COPY build/libs/movierankchart-0.0.1-SNAPSHOT.jar /app/app.jar
CMD ["java", "-jar", "app.jar"]
#CMD ["java", "-jar", "app.jar", "--spring.profiles.active=${Profile}"]
