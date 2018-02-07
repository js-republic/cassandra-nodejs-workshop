#!/usr/bin/env bash

host="$1"

printf "Waiting for cluster"
while :
do
    sleep 3
    result=$(docker exec -ti $host sh -c "cqlsh -e \"DESCRIBE keyspaces;\"")
    if [[ $result != *"Connection error"* ]]; then
        break
    fi
    printf "."
done
