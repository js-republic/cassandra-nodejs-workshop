jest.mock('cassandra-driver');
const { getAllUsersDB } = require('../user.da');
const cassandraDriverMock = require('cassandra-driver');

describe('UserDa', ()=> {
    describe('getAllUsersDB', () => {
        it ('should send a corect query to retrive all users', () => {
            // Given
            // When 
            getAllUsersDB();

            // Then
            expect(cassandraDriverMock.__query).toEqual('SELECT * FROM examples.users')
        });
    });
});