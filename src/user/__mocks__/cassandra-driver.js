const cassandraDriver = jest.genMockFromModule('cassandra-driver');

cassandraDriver.__query = "";
cassandraDriver.Client = jest.fn(() => ({
  execute: (query) => {
    console.log(query);
    cassandraDriver.__query = query;
  },
}));

module.exports = cassandraDriver;

