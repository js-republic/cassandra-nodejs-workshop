const cassandraDriver = jest.genMockFromModule('cassandra-driver');
const originalCassandraDriver = require.requireActual('cassandra-driver');

cassandraDriver.types = originalCassandraDriver.types;
cassandraDriver.__query = "";
cassandraDriver.Client = jest.fn(() => ({
  execute: (query, values) => { 
    cassandraDriver.__query = (query.indexOf("?")>-1)?
    values.reduce((acc,elem)=>{
      if(typeof(elem) === 'string'){
        return acc.split('').fill("'"+elem+"'", acc.indexOf('?'), acc.indexOf('?') + 1).join("")
      }
      if(typeof(elem) === 'number'){
        return acc.split('').fill(elem, acc.indexOf("?"), acc.indexOf("?") + 1).join("")
      }
      return acc.split('').fill(elem.toString(), acc.indexOf('?'), acc.indexOf('?') + 1).join("")
    }, query):
    query;
  },
}));

module.exports = cassandraDriver;

