#!/usr/bin/env bash

docker rm /cassandra-db -f
docker run --name cassandra-db -p 7199:7199 -p 9042:9042 -d cassandra
echo ""
printf "Waiting for Cassandra Database"
while :
do
    sleep 5
    result=$(docker exec -ti cassandra-db sh -c "cqlsh -e \"DESCRIBE keyspaces;\"")
    if [[ $result != *"Connection error"* ]]; then
        echo ""
        echo "Cassandra Database is available, setup dataset..."
        break
    fi
    printf "."
done
docker exec -ti cassandra-db sh -c "cqlsh -e \"CREATE KEYSPACE workshop WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1 }\""
docker exec -ti cassandra-db sh -c "cqlsh -e \"CREATE TABLE workshop.users(id uuid PRIMARY KEY,  username text, password text);\""

echo ""

echo "Cassandra Database is fulfilled and ready for workshop !"