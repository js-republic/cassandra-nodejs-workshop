FROM cassandra:3.11
WORKDIR /

# wait for another node potentially
RUN mkdir /scripts
COPY wait-for-cassandra-node.sh /scripts

# Dataset loading
COPY load-datasets.sh /scripts
RUN mkdir /datasets
VOLUME /datasets
RUN chmod 700 /scripts/load-datasets.sh


CMD /bin/bash -c "(/scripts/wait-for-cassandra-node.sh $CASSANDRA_NODE_TO_WAIT && /scripts/load-datasets.sh) & /docker-entrypoint.sh cassandra -f"