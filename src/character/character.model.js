module.exports = {
  mapToCharacter(characterFromDB) {
    console.log("HERE",characterFromDB);
    return {
      id: characterFromDB.id.toJSON(),
      name: characterFromDB.name,
      house: characterFromDB.house,
      allegiance: characterFromDB.allegiance
    }
  }
};
