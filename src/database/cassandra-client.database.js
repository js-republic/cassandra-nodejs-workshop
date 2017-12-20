const { Client } = require('cassandra-driver');

module.exports = {
  CassandraClient : new Client({ contactPoints: ['127.0.0.1'], keyspace : "examples"})
};