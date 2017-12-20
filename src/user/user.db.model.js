const { types } = require('cassandra-driver');

module.exports = {
  mapToUserDB(id = null, username = null, password = null) {
    return {
      id: id,
      username: username,
      password: password
    }
  },
  uuidFromString(id) {
    return types.Uuid.fromString(id);
  }
};