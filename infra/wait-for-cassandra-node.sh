#!/usr/bin/env bash

host="$1"

printf "Waiting for $host node"
while :
do
    sleep 3
    result=$(cqlsh $host -e "DESCRIBE keyspaces;" 2>&1)
    if [[ $result != *"Connection error"* ]]; then
        echo ""
        echo "Cassandra $host node is available. Continue ..."
        echo ""
        break
    fi
    printf "."
done
