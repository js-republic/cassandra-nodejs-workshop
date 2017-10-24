"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("./user/user.service");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const router = express.Router();
app.set("port", process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const server = http.createServer(app);
server.listen(app.get("port"));
server.on('error', () => { });
server.on('listening', () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
router.get('/users', (req, res) => {
    user_service_1.getAllUsers().then((users) => res.json({
        users: users
    }));
});
router.post('/user', (req, res) => {
    const userToAdd = req.body;
    user_service_1.addUser(userToAdd).then((userId) => res.json({
        userIdAdded: userId
    }));
});
app.use("/", router);
//# sourceMappingURL=index.js.map