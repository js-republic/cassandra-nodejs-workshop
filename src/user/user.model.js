module.exports = {
  mapToUser(userFromDB) {
    return {
      id: userFromDB.id.toJSON(),
      username: userFromDB.username,
      password: userFromDB.password
    }
  }
};
