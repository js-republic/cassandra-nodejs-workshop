const { getAllUsersDB, insertUser } = require('./user.da');
const { mapToUserDB } = require('./user.db.model');
const { mapToUser } = require('./user.model');


module.exports = {
  async getAllUsers() {
    const usersDB = await getAllUsersDB();
    return usersDB.map(mapToUser);
  },

  async addUser(userToAdd) {
    const userToAddDB = mapToUserDB(null, userToAdd.username, userToAdd.password);
    const userId = await insertUser(userToAddDB);
    return userId;

  },
  
  async getUser(id) {
    const userDB = await getUserById(id).catch(handleError);
    return mapToUser(userDB);
  },

  async modifyUser(userToUpdate) {
    const userToAddDB = mapToUserDB(null,userToUpdate.username, userToUpdate.password);
    const wasUpdated = await updateUser(userToUpdate.id,userToAddDB).catch(handleError);
    return wasUpdated;
  },

  async removeUser(userIdToDelete) {
    return await deleteUser(uuidFromString(userIdToDelete)).catch(handleError);
  }
};


function handleError(error) {
  console.error("Error on executing a function from DA", error);
  return null;
}