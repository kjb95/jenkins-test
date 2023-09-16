FROM ubuntu:latest
WORKDIR /app

RUN mkdir backend && mkdir frontend

COPY db /app

COPY ./backend/build/libs/movierankchart-0.0.1-SNAPSHOT.jar ./backend/app.jar
COPY ./backend/Dockerfile ./backend/Docekrfile

COPY ./frontend/default.conf ./frontend/default.conf
COPY ./frontend/dist ./frontend/dist

COPY ./docker-compose.yml ./docker-compose.yml

CMD docker-compose up --build