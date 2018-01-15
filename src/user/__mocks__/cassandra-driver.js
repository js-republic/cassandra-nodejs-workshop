const cassandraDriver = jest.genMockFromModule('cassandra-driver');
const originalCassandraDriver = require.requireActual('cassandra-driver');

cassandraDriver.types = originalCassandraDriver.types;
cassandraDriver.__query = "";
cassandraDriver.Client = jest.fn(() => ({
  execute: (query, values) => { 
    cassandraDriver.__query = (query.indexOf("?")>-1)?
    values.reduce((acc,elem)=>{
      return acc.split('')
                .fill(stringify(elem), acc.indexOf('?'), acc.indexOf('?') + 1)
                .join('')
    }, query):
    query;
  },
}));

function stringify(value){
  if(typeof(value) === 'string'){
    return "'" + value + "'";
  }
  return value.toString();
}

module.exports = cassandraDriver;

