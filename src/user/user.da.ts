import { Client, types } from 'cassandra-driver';
import { UserDB, mapToUserDB } from './user.db.model';
import { User } from './user.model';
import { apply } from 'async'
import { CassandraClient } from '../database/cassandra-client.database';

export async function getAllUsersDB() : Promise<UserDB[]> {
    const query : string = "SELECT * FROM examples.users"
    const resQuery : types.ResultSet = await CassandraClient.execute(query)
                                                            .catch((err)=>{
                                                                console.error("Error getAllUsersDB", err);
                                                                return null;
                                                            });
    return resQuery.rows.map((row : types.Row) => 
        mapToUserDB(row['id'],row['username'],row['password']) 
    );
} 

export async function getUserById(id : string) : Promise<UserDB> {
    const uuid = types.Uuid.fromString(id);
    const query : string = "SELECT * FROM examples.users WHERE id=?"
    const resQuery : types.ResultSet = await CassandraClient.execute(query,[uuid])
                                                            .catch(handleError);
    const row : types.Row = resQuery.first();
    return mapToUserDB(row['id'],row['username'],row['password']);
}

export async function insertUser(userToAdd : UserDB) : Promise<string> {
    userToAdd.id = types.TimeUuid.now();
    const query : string = "INSERT INTO examples.users(id,username,password) VALUES (?,?,?)";
    const resQuery : types.ResultSet = await CassandraClient.execute(query,[userToAdd.id,userToAdd.username,userToAdd.password])
                                                            .catch(handleError);
    return (resQuery)?userToAdd.id.toString():null;

}

export async function updateUser(id : string, userToUpdate : UserDB) : Promise<boolean> {
    userToUpdate.id = types.Uuid.fromString(id);
    const query : string = "UPDATE examples.users SET username=?, password=? WHERE id=?";
    const resQuery : types.ResultSet = await CassandraClient.execute(query,[userToUpdate.username,userToUpdate.password,userToUpdate.id])
                                                            .catch(handleError);
    return (resQuery)?true:false;
}

export async function deleteUser(userIdToDelete : types.Uuid) : Promise<boolean> {
    const query : string = "DELETE FROM examples.users WHERE id=?";
    const resQuery : types.ResultSet = await CassandraClient.execute(query,[userIdToDelete])
                                                            .catch(handleError);
    return (resQuery)?true:false;
}

function handleError(error : Error) : any {
    console.error("Error on executing query:", error );
    return null;
}