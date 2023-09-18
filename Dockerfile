FROM ubuntu:latest
WORKDIR /app

RUN apt-get update && apt-get install sudo && \
    apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common && \
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && \
    apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose

RUN groupadd -f docker

COPY ./db /app/db

RUN mkdir backend
COPY ./backend/build/libs/movierankchart-0.0.1-SNAPSHOT.jar ./backend/app.jar
COPY ./backend/Dockerfile ./backend/Docekrfile

RUN mkdir frontend
COPY ./frontend/default.conf ./frontend/default.conf
COPY ./frontend/dist ./frontend/dist

COPY ./docker-compose.yml ./docker-compose.yml
