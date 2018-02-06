const {types} = require('cassandra-driver');
const {mapToUserDB} = require('./user.db.model');
const {CassandraClient} = require('../database/cassandra-client.database');

module.exports = {
  getAllUsersDB() {
    const query = 'SELECT * FROM workshop.users';
    return CassandraClient.execute(query).then(resQuery => {
      return resQuery.rows.map((row) =>
        mapToUserDB(row['id'], row['username'], row['password'])
      )
    });
  },

  getUserById(id) {
    const params = [types.Uuid.fromString(id)];
    const query = 'SELECT * FROM workshop.users WHERE id=?';
    return CassandraClient.execute(query, params).then(resQuery => {
      const row = resQuery.first();
      return mapToUserDB(row['id'], row['username'], row['password']);
    });
  },

  insertUser(userToAdd) {
    const query = 'INSERT INTO workshop.users(id,username,password) VALUES (?,?,?)';
    const newId = types.TimeUuid.now();
    const params = [newId, userToAdd.username, userToAdd.password];
    return CassandraClient.execute(query, params).then(() => {
      return newId.toString();
    });
  },

  updateUser(id, userToUpdate) {
    const query = 'UPDATE workshop.users SET username=?, password=? WHERE id=?';
    const params = [userToUpdate.username, userToUpdate.password, types.Uuid.fromString(id)];
    return CassandraClient.execute(query, params).then(resQuery => !!resQuery);
  },

  deleteUser(userIdToDelete) {
    const query = 'DELETE FROM workshop.users WHERE id=?';
    return CassandraClient.execute(query, [userIdToDelete]).then(resQuery => !!resQuery)
  }
};