FROM ubuntu:latest
WORKDIR /app

COPY db /app

CMD mkdir backend
COPY ./backend/build/libs/movierankchart-0.0.1-SNAPSHOT.jar /app/backend/app.jar
COPY ./backend/Dockerfile /app/backend/Docekrfile

CMD mkdir frontend
COPY ./frontend/default.conf /app/frontend/default.conf
COPY ./frontend/dist /app/frontend/dist

COPY ./docker-compose.yml /app/docker-compose.yml

CMD docker-compose up --build