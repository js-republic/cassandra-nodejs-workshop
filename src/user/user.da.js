const { types } = require('cassandra-driver');
const { mapToUserDB } = require('./user.db.model');
const { CassandraClient } = require('../database/cassandra-client.database');

module.exports = {
  async getAllUsersDB() {
    const query = "SELECT * FROM examples.users";
    const resQuery = await
      CassandraClient.execute(query);

    return resQuery.rows.map((row) =>
      mapToUserDB(row['id'], row['username'], row['password'])
    );
  },

  async getUserById(id) {
    const uuid = types.Uuid.fromString(id);
    const query = "SELECT * FROM examples.users WHERE id=?";
    const resQuery = await CassandraClient.execute(query,[uuid])
      .catch(handleError);
    const row = resQuery.first();
    return mapToUserDB(row['id'],row['username'],row['password']);
  },

  async insertUser(userToAdd) {
    userToAdd.id = types.TimeUuid.now();
    const query = "INSERT INTO examples.users(id,username,password) VALUES (?,?,?)";
    const resQuery = await CassandraClient.execute(query, [userToAdd.id, userToAdd.username, userToAdd.password]);
    return userToAdd.id.toString();
  },

  async updateUser(id, userToUpdate){
    userToUpdate.id = types.Uuid.fromString(id);
    const query  = "UPDATE examples.users SET username=?, password=? WHERE id=?";
    const resQuery = await CassandraClient.execute(query,[userToUpdate.username,userToUpdate.password,userToUpdate.id])
      .catch(handleError);
    return !!(resQuery);
},

  async deleteUser(userIdToDelete)  {
    const query = "DELETE FROM examples.users WHERE id=?";
    const resQuery = await CassandraClient.execute(query,[userIdToDelete])
      .catch(handleError);
    return !!(resQuery);
  }
};


function handleError(error) {
  console.error("Error on executing query:", error );
  return null;
}