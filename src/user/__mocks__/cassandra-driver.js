const cassandraDriver = jest.genMockFromModule('cassandra-driver');
const originalCassandraDriver = require.requireActual('cassandra-driver');

cassandraDriver.types = originalCassandraDriver.types;
cassandraDriver.__query = '';
cassandraDriver.resulSet = [];

cassandraDriver.Client = jest.fn(() => ({
  execute: (query, values) => {
    const hasParam = query.indexOf('?') > -1;
    cassandraDriver.__query = hasParam ? replaceParamByValue(values, query) : query;
    return Promise.resolve({
      first() {
        return cassandraDriver.resulSet[0];
      },
      rows: cassandraDriver.resulSet
    });
  },
}));

function replaceParamByValue(values, query) {
  return values.reduce((acc, elem) => {
    return acc.split('')
      .fill(stringify(elem), acc.indexOf('?'), acc.indexOf('?') + 1)
      .join('')
  }, query);
}

function stringify(value) {
  if (typeof(value) === 'string') {
    return '\'' + value + '\'';
  }
  return value.toString();
}

module.exports = cassandraDriver;

