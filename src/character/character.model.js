module.exports = {
  mapToCharacter(characterFromDB) {
    return {
      id: characterFromDB.id.toJSON(),
      name: characterFromDB.name,
      house: characterFromDB.house,
      allegiance: characterFromDB.allegiance
    }
  }
};
