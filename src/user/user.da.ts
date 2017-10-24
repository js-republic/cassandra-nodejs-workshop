import { Client, types } from 'cassandra-driver';
import { UserDB, mapToUserDB } from './user.db.model';
import { User } from './user.model';
import { apply } from 'async'
import { CassandraClient } from '../database/cassandra-client.database';

export async function getAllUsersDB() : Promise<UserDB[]> {
    const query : string = "SELECT * FROM examples.users"
    const resQuery : types.ResultSet = await CassandraClient.execute(query);
    
    return resQuery.rows.map((row : types.Row) => 
        mapToUserDB(row['id'],row['username'],row['password']) 
    );
} 

export async function insertUser(userToAdd : UserDB) : Promise<string> {
    userToAdd.id = types.TimeUuid.now();
    const query : string = "INSERT INTO examples.users(id,username,password) VALUES (?,?,?)";
    const resQuery : types.ResultSet = await CassandraClient.execute(query,[userToAdd.id,userToAdd.username,userToAdd.password]);
    return userToAdd.id.toString();
}