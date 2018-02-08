const {types} = require('cassandra-driver');
const {mapToCharacterDB} = require('./character.db.model');
const {CassandraClient} = require('../database/cassandra-client.database');

module.exports = {
  getAllCharactersDB() {
    // implement here ...
  },

  getCharacterById(id) {
    // implement here ...
  },

  insertCharacter(characterToAdd) {
    // implement here ...
  },

  updateCharacter(id, characterToUpdate) {
    // implement here ...
  },

  deleteCharacter(characterIdToDelete) {
    // implement here ...
  }
};