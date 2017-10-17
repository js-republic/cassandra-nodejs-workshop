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
function getUsers(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM examples.users";
        const resQuery = yield client.execute(query);
        return resQuery.rows.map((row) => user_db_model_1.newUserDB(row['id'], row['username'], row['password']));
    });
}
exports.getUsers = getUsers;
//# sourceMappingURL=userORM.js.map