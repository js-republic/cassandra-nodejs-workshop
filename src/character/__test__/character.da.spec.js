jest.mock('cassandra-driver');
const {
  getAllCharactersDB,
  getCharacterById,
  deleteCharacter,
  insertCharacter,
  updateCharacter
} = require('../character.da');
const {types} = require('cassandra-driver');
const cassandraDriverMock = require('cassandra-driver');

describe('CharacterDa', () => {
  beforeEach(() => {
    cassandraDriverMock.__query = '';
    cassandraDriverMock.resulSet = [];
  });

  describe('getAllCharactersDB', () => {
    it('should send a correct query to retrieve all characters', (done) => {
      // Given
      cassandraDriverMock.resulSet = [];

      // When
      const promise = getAllCharactersDB();

      // Then
      promise.then(() => {
        expect(cassandraDriverMock.__query).toEqual('SELECT * FROM workshop.characters');
        done();
      });
    });

    it('should return all characters in db', (done) => {
      // Given
      cassandraDriverMock.resulSet = [{
        id:types.Uuid.fromString('50558d6e-29bb-11e5-b345-feff819cdc9f'),
        name: 'Robb',
        house: 'Stark',
        allegiance:'Stark'
      },
      {
        id: types.Uuid.fromString('50558d6e-29bb-12e5-b345-feff819cdc9f'),
        name: 'Stannis',
        house: 'Baratheon',
        allegiance:'Baratheon'
      }];

      // When
      const promise = getAllCharactersDB();

      // Then
      promise.then((result) => {
        expect(result).toEqual(cassandraDriverMock.resulSet);
        done();
      });
    });
  });

  describe('getCharacterById', () => {
    it('should send a correct query to retrieve the character with id 50554d6e-29bb-11e5-b345-feff819cdc9f', (done) => {
      // Given
      const id = '50554d6e-29bb-11e5-b345-feff819cdc9f';
      cassandraDriverMock.resulSet = [{id: id, name: 'Mathieu', house: 'Breton', allegiance: 'Breton'}];

      // When
      const promise = getCharacterById(id);

      // Then
      promise.then(() => {
        expect(cassandraDriverMock.__query).toEqual('SELECT * FROM workshop.characters WHERE id=50554d6e-29bb-11e5-b345-feff819cdc9f');
        done();
      });
    });

    it('should return the character with id 50554d6e-29bb-11e5-b345-feff819cdc9f', (done) => {
      // Given
      const id = '50554d6e-29bb-11e5-b345-feff819cdc9f';
      cassandraDriverMock.resulSet = [{id: id, name: 'Mathieu', house: 'Breton', allegiance: 'Breton'}];

      // When
      const promise = getCharacterById(id);

      // Then
      promise.then((result) => {
        expect(result).toEqual({id: id, name: 'Mathieu', house: 'Breton', allegiance: 'Breton'});
        done();
      });
    });
  });

  describe('deleteCharacter', () => {
    it('should send a correct query to delete the character with id 50554d6e-29bb-11e5-b345-feff819cdc9f', (done) => {
      // Given
      const idCharacterToDelete = types.Uuid.fromString('50554d6e-29bb-11e5-b345-feff819cdc9f');
      cassandraDriverMock.resulSet = [{id: idCharacterToDelete, name: 'Mathieu', house: 'Breton', allegiance: 'Breton'}];

      // When
      const promise = deleteCharacter(idCharacterToDelete);

      // Then
      promise.then(() => {
        expect(cassandraDriverMock.__query).toEqual('DELETE FROM workshop.characters WHERE id=50554d6e-29bb-11e5-b345-feff819cdc9f');
        done();
      });
    });

    it('should delete the character with id 50554d6e-29bb-11e5-b345-feff819cdc9f and return true', (done) => {
      // Given
      const idCharacterToDelete = types.Uuid.fromString('50554d6e-29bb-11e5-b345-feff819cdc9f');
      cassandraDriverMock.resulSet = [{id: idCharacterToDelete, name: 'Mathieu', house: 'Breton', allegiance: 'Breton'}];

      // When
      const promise = deleteCharacter(idCharacterToDelete);

      // Then
      promise.then((result) => {
        expect(result).toBeTruthy();
        done();
      });
    });
  });

  describe('insertCharacter', () => {
    it('should send a correct query to insert character with name johndoe and house edfjkjq', (done) => {
      // Given
      const characterToAdd = {id: null, name: 'John', house: 'Doe', allegiance: 'Doe'};
      cassandraDriverMock.resulSet = [];

      // When
      const promise = insertCharacter(characterToAdd);

      promise.then(idNewCharacter => {
        // Then
        expect(cassandraDriverMock.__query).toEqual(`INSERT INTO workshop.characters(id,name,house,allegiance) VALUES (${idNewCharacter},'John','Doe','Doe')`);
        done();
      });
    });
  });

  describe('updateCharacter', () => {
    it('should send a correct query to update character with id 50554d6e-29bb-11e5-b345-feff819cdc9f, name janedoe and house rfderlm', (done) => {
      // Given
      const characterToUpdate = {id: '50554d6e-29bb-11e5-b345-feff819cdc9f', name: 'Jane', house: 'Doe', allegiance: 'Doe'};

      // When
      const promise = updateCharacter('50554d6e-29bb-11e5-b345-feff819cdc9f', characterToUpdate);

      // Then
      promise.then(() => {
        expect(cassandraDriverMock.__query).toEqual('UPDATE workshop.characters SET name=\'Jane\', house=\'Doe\', allegiance=\'Doe\' WHERE id=50554d6e-29bb-11e5-b345-feff819cdc9f')
        done();
      });
    });

    it('should return true meaning it was updated', (done) => {
      // Given
      const characterToUpdate = {id: '50554d6e-29bb-11e5-b345-feff819cdc9f', name: 'Jane', house: 'Doe', allegiance: 'Doe'};

      // When
      const promise = updateCharacter('50554d6e-29bb-11e5-b345-feff819cdc9f', characterToUpdate);

      // Then
      promise.then((result) => {
        expect(result).toBeTruthy();
        done();
      });
    });
  });
});