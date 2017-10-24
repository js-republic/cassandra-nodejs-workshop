import { getAllUsersDB, insertUser } from './user.da';
import { UserDB, mapToUserDB } from './user.db.model';
import { User, mapToUser } from './user.model';

export async function getAllUsers() : Promise<User[]>{
    const usersDB : UserDB[] = await getAllUsersDB();
    return usersDB.map(mapToUser);
}

export async function addUser(userToAdd : User) : Promise<string>{
    const userToAddDB = mapToUserDB(null,userToAdd.username, userToAdd.password);
    const userId : string = await insertUser(userToAddDB);
    return userId;
}