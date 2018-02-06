const {types} = require('cassandra-driver');
const {mapToCharacterDB} = require('./character.db.model');
const {CassandraClient} = require('../database/cassandra-client.database');

module.exports = {
  getAllCharactersDB() {
    const query = 'SELECT * FROM workshop.characters';
    return CassandraClient.execute(query).then(resQuery => {
      return resQuery.rows.map((row) =>
        mapToCharacterDB(row['id'], row['name'], row['house'], row['allegiance'])
      )
    });
  },

  getCharacterById(id) {
    const params = [types.Uuid.fromString(id)];
    const query = 'SELECT * FROM workshop.characters WHERE id=?';
    return CassandraClient.execute(query, params).then(resQuery => {
      const row = resQuery.first();
      return mapToCharacterDB(row['id'], row['name'], row['house'], row['allegiance']);
    });
  },

  insertCharacter(characterToAdd) {
    const query = 'INSERT INTO workshop.characters(id,name,house,allegiance) VALUES (?,?,?,?)';
    const newId = types.TimeUuid.now();
    const params = [newId, characterToAdd.name, characterToAdd.house,characterToAdd.allegiance];
    return CassandraClient.execute(query, params).then(() => {
      return newId.toString();
    });
  },

  updateCharacter(id, characterToUpdate) {
    const query = 'UPDATE workshop.characters SET name=?, house=?, allegiance=? WHERE id=?';
    const params = [characterToUpdate.name, characterToUpdate.house, characterToUpdate.allegiance, types.Uuid.fromString(id)];
    return CassandraClient.execute(query, params).then(resQuery => !!resQuery);
  },

  deleteCharacter(characterIdToDelete) {
    const query = 'DELETE FROM workshop.characters WHERE id=?';
    return CassandraClient.execute(query, [characterIdToDelete]).then(resQuery => !!resQuery)
  }
};