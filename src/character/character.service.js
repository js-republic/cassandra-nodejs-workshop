const {
  getAllCharactersDB, 
  insertCharacter, 
  updateCharacter, 
  deleteCharacter, 
  getCharacterById
} = require('./character.da');
const {mapToCharacterDB} = require('./character.db.model');
const {mapToCharacter} = require('./character.model');


module.exports = {
  getAllCharacters() {
    return getAllCharactersDB()
      .then(charactersDB => charactersDB.map(mapToCharacter));
  },

  addCharacter(characterToAdd) {
    const characterToAddDB = mapToCharacterDB(null, characterToAdd.name, characterToAdd.house, characterToAdd.allegiance);
    return insertCharacter(characterToAddDB);
  },

  getCharacter(id) {
    return getCharacterById(id).then((character) => mapToCharacter(character));
  },

  modifyCharacter(characterToUpdate) {
    const characterToAddDB = mapToCharacterDB(null, characterToUpdate.name, characterToUpdate.house, characterToUpdate.allegiance);
    return updateCharacter(characterToUpdate.id, characterToAddDB);
  },

  removeCharacter(characterIdToDelete) {
    return deleteCharacter(uuidFromString(characterIdToDelete))
  }
};