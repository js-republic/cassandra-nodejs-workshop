const {Client, policies} = require('cassandra-driver');

const localDatacenter = 'datacenter1';

module.exports = {
  CassandraClient: new Client({
    contactPoints: ['127.0.0.1:9042', '127.0.0.1:9142'],
    keyspace: 'workshop',
    policies: {
      loadBalancing: new policies.loadBalancing.DCAwareRoundRobinPolicy(localDatacenter, 1)
    }
  })
};