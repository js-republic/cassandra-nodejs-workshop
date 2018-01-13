jest.mock('cassandra-driver');
const { 
    getAllUsersDB, 
    getUserById, 
    deleteUser,
    insertUser,
    updateUser  
} = require('../user.da');
const { types } = require('cassandra-driver');
const cassandraDriverMock = require('cassandra-driver');

describe('UserDa', ()=> {
    beforeEach(() => {
        cassandraDriverMock.__query = "";
    });

    describe('getAllUsersDB', () => {
        it ('should send a correct query to retrive all users', () => {
            // Given
            // When 
            getAllUsersDB();

            // Then
            expect(cassandraDriverMock.__query).toEqual('SELECT * FROM examples.users');
        });
    });

    describe('getUserById', () => {
        it ('should send a correct query to retrive the user with id 50554d6e-29bb-11e5-b345-feff819cdc9f', () => {
            // Given
            const id = "50554d6e-29bb-11e5-b345-feff819cdc9f";
            // When 
            getUserById(id);

            // Then
            expect(cassandraDriverMock.__query).toEqual('SELECT * FROM examples.users WHERE id=50554d6e-29bb-11e5-b345-feff819cdc9f');
        });
    });

    describe('deleteUser', () => {
        it ('should send a correct query to delete the user with id 50554d6e-29bb-11e5-b345-feff819cdc9f', () => {
            // Given
            const idUserToDelete = types.Uuid.fromString("50554d6e-29bb-11e5-b345-feff819cdc9f")
            // When 
            deleteUser(idUserToDelete);

            // Then
            expect(cassandraDriverMock.__query).toEqual('DELETE FROM examples.users WHERE id=50554d6e-29bb-11e5-b345-feff819cdc9f');
        });
    });

    describe('insertUser', () => {
        it ('', async () => {
            // Given
            const userToAdd = { id: null, username: 'johndoe', password: 'edfjkjq' };
            // When 
            const idNewUser = await insertUser(userToAdd);
            // Then
            expect(cassandraDriverMock.__query).toEqual(`INSERT INTO examples.users(id,username,password) VALUES (${idNewUser},'johndoe','edfjkjq')`);
        });
    });

    describe('updateUser', () => {
        it ('', () => {
            // Given
            const userToUpdate = { id: "50554d6e-29bb-11e5-b345-feff819cdc9f", username: 'janedoe', password: 'rfderlm' }
            // When 
            updateUser("50554d6e-29bb-11e5-b345-feff819cdc9f",userToUpdate);

            // Then
            expect(cassandraDriverMock.__query).toEqual("UPDATE examples.users SET username='janedoe', password='rfderlm' WHERE id=50554d6e-29bb-11e5-b345-feff819cdc9f")
        });
    });
});