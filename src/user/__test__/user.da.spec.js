jest.mock('cassandra-driver');
const {
  getAllUsersDB,
  getUserById,
  deleteUser,
  insertUser,
  updateUser
} = require('../user.da');
const {types} = require('cassandra-driver');
const cassandraDriverMock = require('cassandra-driver');

describe('UserDa', () => {
  beforeEach(() => {
    cassandraDriverMock.__query = '';
  });

  describe('getAllUsersDB', () => {
    it('should send a correct query to retrieve all users', (done) => {
      // Given
      cassandraDriverMock.resulSet = [];

      // When
      const promise = getAllUsersDB();

      // Then
      promise.then(() => {
        expect(cassandraDriverMock.__query).toEqual('SELECT * FROM workshop.users');
        done();
      });
    });
  });

  describe('getUserById', () => {
    it('should send a correct query to retrieve the user with id 50554d6e-29bb-11e5-b345-feff819cdc9f', (done) => {
      // Given
      const id = '50554d6e-29bb-11e5-b345-feff819cdc9f';
      cassandraDriverMock.resulSet = [{id: id, username: 'Mathieu', password: 'password'}];

      // When
      const promise = getUserById(id);

      // Then
      promise.then(() => {
        expect(cassandraDriverMock.__query).toEqual('SELECT * FROM workshop.users WHERE id=50554d6e-29bb-11e5-b345-feff819cdc9f');
        done();
      });
    });
  });

  describe('deleteUser', () => {
    it('should send a correct query to delete the user with id 50554d6e-29bb-11e5-b345-feff819cdc9f', (done) => {
      // Given
      const idUserToDelete = types.Uuid.fromString('50554d6e-29bb-11e5-b345-feff819cdc9f');
      cassandraDriverMock.resulSet = [];

      // When
      const promise = deleteUser(idUserToDelete);

      // Then
      promise.then(() => {
        expect(cassandraDriverMock.__query).toEqual('DELETE FROM workshop.users WHERE id=50554d6e-29bb-11e5-b345-feff819cdc9f');
        done();
      });
    });
  });

  describe('insertUser', () => {
    it('should send a correct query to insert user with username johndoe and password edfjkjq', (done) => {
      // Given
      const userToAdd = {id: null, username: 'johndoe', password: 'edfjkjq'};
      cassandraDriverMock.resulSet = [];

      // When
      const promise = insertUser(userToAdd);

      promise.then(idNewUser => {
        // Then
        expect(cassandraDriverMock.__query).toEqual(`INSERT INTO workshop.users(id,username,password) VALUES (${idNewUser},'johndoe','edfjkjq')`);
        done();
      });
    });
  });

  describe('updateUser', () => {
    it('should send a correct query to update user with id 50554d6e-29bb-11e5-b345-feff819cdc9f, username janedoe and password rfderlm', (done) => {
      // Given
      const userToUpdate = {id: '50554d6e-29bb-11e5-b345-feff819cdc9f', username: 'janedoe', password: 'rfderlm'};
      cassandraDriverMock.resulSet = [];

      // When
      const promise = updateUser('50554d6e-29bb-11e5-b345-feff819cdc9f', userToUpdate);

      // Then
      promise.then(() => {
        expect(cassandraDriverMock.__query).toEqual('UPDATE workshop.users SET username=\'janedoe\', password=\'rfderlm\' WHERE id=50554d6e-29bb-11e5-b345-feff819cdc9f')
        done();
      });
    });
  });
});