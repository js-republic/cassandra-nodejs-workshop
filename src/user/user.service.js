const {getAllUsersDB, insertUser} = require('./user.da');
const {mapToUserDB} = require('./user.db.model');
const {mapToUser} = require('./user.model');


module.exports = {
  getAllUsers() {
    return getAllUsersDB()
      .then(usersDB => usersDB.map(mapToUser));

  },

  addUser(userToAdd) {
    const userToAddDB = mapToUserDB(null, userToAdd.username, userToAdd.password);
    return insertUser(userToAddDB);

  },

  getUser(id) {
    return getUserById(id).then(mapToUser);
  },

  modifyUser(userToUpdate) {
    const userToAddDB = mapToUserDB(null, userToUpdate.username, userToUpdate.password);
    return updateUser(userToUpdate.id, userToAddDB);
  },

  removeUser(userIdToDelete) {
    return deleteUser(uuidFromString(userIdToDelete))
  }
};