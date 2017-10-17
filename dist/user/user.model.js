"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapToUser(userFromDB) {
    return {
        id: userFromDB.id.toJSON(),
        username: userFromDB.username,
        password: userFromDB.password
    };
}
exports.mapToUser = mapToUser;
//# sourceMappingURL=user.model.js.map