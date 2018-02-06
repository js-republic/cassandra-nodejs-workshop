const { types } = require('cassandra-driver');

module.exports = {
  mapToCharacterDB(id = null, name = null, house = null, allegiance = null) {
    console.log(id,name,house,allegiance);
    return {
      id: id,
      name: name,
      house: house,
      allegiance: allegiance
    }
  },
  uuidFromString(id) {
    return types.Uuid.fromString(id);
  }
};