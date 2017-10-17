import { Client } from 'cassandra-driver';

export const CassandraClient = new Client({ contactPoints: ['127.0.0.1'], keyspace : "examples"});

