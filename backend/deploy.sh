#!/bin/bash

CURRENT_PROFILE=$(curl -s http://localhost:8081/profile)
if [[ $CURRENT_PROFILE == prod_v1 ]]
then
  IDLE_PROFILE=prod_v2
  IDLE_PORT=8082
elif [[ $CURRENT_PROFILE == prod_v2 ]]
then
  IDLE_PROFILE=prod_v1
  IDLE_PORT=8081
else
  echo "> No exist profile"
  echo "> prod_v1 deploy"
  IDLE_PROFILE=prod_v1
  IDLE_PORT=8081
fi

echo "> $IDLE_PROFILE $IDLE_PORT deploy start"
java -jar -Dspring.profiles.active=$IDLE_PROFILE ./build/libs/movierankchart-0.0.1-SNAPSHOT.jar