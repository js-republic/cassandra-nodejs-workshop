import { getAllUsersDB } from '../user.da';
import * as cassandraDriverMock from 'cassandra-driver';


jest.mock('cassandra-driver');

describe('UserDa', ()=> {
    describe('getAllUsersDB', () => {
        it ('should send a corect query to retrive all users', () => {
            // Given

            // When 
            getAllUsersDB();

            // Then
            expect(cassandraDriverMock.__query).toEqual('')
        });
    });
});