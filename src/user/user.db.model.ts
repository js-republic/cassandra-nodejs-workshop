import { types } from 'cassandra-driver';

export type UserDB = {
    id : types.Uuid,
    username : string,
    password : string
}

export function mapToUserDB( id: types.Uuid = null, username: string = null, password: string = null ) : UserDB {
    return {
        id : id,
        username : username,
        password : password
    }
}

