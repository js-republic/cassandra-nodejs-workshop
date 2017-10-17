import { Client, types } from 'cassandra-driver';
import { UserDB, mapToUserDB } from './user.db.model';
import { User } from './user.model';
import { apply } from 'async'
import { CassandraClient } from '../database/cassandra-client.database';

export async function getAllUsersDB() : Promise<UserDB[]> {
    const query = "SELECT * FROM examples.users"
    const resQuery : types.ResultSet = await CassandraClient.execute(query);
    
    return resQuery.rows.map((row : types.Row) => 
        mapToUserDB(row['id'],row['username'],row['password']) 
    );
} 