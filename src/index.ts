
import { getAllUsers, addUser } from './user/user.service';
import { mapToUser, User } from './user/user.model';

import * as express from 'express';
import * as util from 'util';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as http from 'http';

const app : express.Application = express();
const router : express.Router = express.Router();

app.set("port", process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
server.listen(app.get("port"));
server.on('error',()=>{});
server.on('listening', ()=>{
    console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});

router.get('/users', (req: express.Request, res: express.Response) => {
    getAllUsers().then((users) => 
        res.json({
            users: users
        })
    );
});

router.post('/user', (req: express.Request, res: express.Response) => {
    const userToAdd : User = req.body;
    addUser(userToAdd).then((userId) => 
        res.json({
            userIdAdded: userId
        })
    );
});

app.use("/",router);



