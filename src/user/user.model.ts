import { UserDB } from './user.db.model';
    
export type User = {
        id : string;
        username : string;
        password : string;
}

export function mapToUser( userFromDB : UserDB ) : User {
    return {
        id : userFromDB.id.toJSON(),
        username : userFromDB.username,
        password : userFromDB.password
    }
}
