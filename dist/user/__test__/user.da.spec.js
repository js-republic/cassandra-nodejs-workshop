"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_da_1 = require("../user.da");
const cassandraDriverMock = require("cassandra-driver");
jest.mock('cassandra-driver');
describe('UserDa', () => {
    describe('getAllUsersDB', () => {
        it('should send a corect query to retrive all users', () => {
            // Given
            // When 
            user_da_1.getAllUsersDB();
            // Then
            expect(cassandraDriverMock.__query).toEqual('');
        });
    });
});
//# sourceMappingURL=user.da.spec.js.map