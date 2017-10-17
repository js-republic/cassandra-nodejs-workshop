"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_db_model_1 = require("./user.db.model");
const cassandra_client_database_1 = require("../database/cassandra-client.database");
function getAllUsersDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM examples.users";
        const resQuery = yield cassandra_client_database_1.CassandraClient.execute(query);
        return resQuery.rows.map((row) => user_db_model_1.mapToUserDB(row['id'], row['username'], row['password']));
    });
}
exports.getAllUsersDB = getAllUsersDB;
//# sourceMappingURL=user.da.js.map