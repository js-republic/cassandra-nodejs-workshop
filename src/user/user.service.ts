import { getAllUsersDB, insertUser, getUserById, updateUser, deleteUser  } from './user.da';
import { UserDB, mapToUserDB, uuidFromString } from './user.db.model';
import { User, mapToUser } from './user.model';

export async function getAllUsers() : Promise<User[]>{
    const usersDB : UserDB[] = await getAllUsersDB().catch(handleError);
    return usersDB.map(mapToUser);
}

export async function getUser(id : string) : Promise<User>{
    const userDB : UserDB = await getUserById(id).catch(handleError);
    return mapToUser(userDB);
}

export async function addUser(userToAdd : User) : Promise<string>{
    const userToAddDB = mapToUserDB(null,userToAdd.username, userToAdd.password);
    const userId : string = await insertUser(userToAddDB).catch(handleError);
    return userId;
}

export async function modifyUser(userToUpdate : User) : Promise<boolean>{
    const userToAddDB = mapToUserDB(null,userToUpdate.username, userToUpdate.password);
    const wasUpdated : boolean = await updateUser(userToUpdate.id,userToAddDB).catch(handleError);
    return wasUpdated;
}

export async function removeUser(userIdToDelete : string) : Promise<boolean>{
    const wasDeleted : boolean = await deleteUser(uuidFromString(userIdToDelete)).catch(handleError);
    return wasDeleted;
}

function handleError(error : Error) : any {
    console.error("Error on executing a function from DA", error);
    return null;
}