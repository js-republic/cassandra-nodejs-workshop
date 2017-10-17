import { getAllUsersDB } from './user.da';
import { UserDB } from './user.db.model';
import { User, mapToUser } from './user.model';

export async function getAllUsers() : Promise<User[]>{
    const usersDB : UserDB[] = await getAllUsersDB();
    return usersDB.map(mapToUser);
}