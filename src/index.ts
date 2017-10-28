
import { getAllUsers, addUser, modifyUser, getUser, removeUser } from './user/user.service';
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
    )
    .catch(err => res.json(err));
});

router.get('/user/:id', (req: express.Request, res: express.Response) => {
    const id : string = req.params['id'] ;
    getUser(id).then((user) => 
        res.json({
            user: user
        })
    )
    .catch(err => res.json(err));
});

router.post('/user', (req: express.Request, res: express.Response) => {
    const userToAdd : User = req.body;
    addUser(userToAdd).then((userId) => 
        res.json({
            userIdAdded: userId
        })
    )
    .catch(err => res.json(err));
});


router.patch('/user', (req: express.Request, res: express.Response) => {
    const userToUpdate : User = req.body;
    modifyUser(userToUpdate)
    .then(wasUpdated => res.json(wasUpdated))
    .catch(err => res.json(err));
});

router.delete('/user/:id', (req: express.Request, res: express.Response) => {
    const id : string = req.params['id'] ;
    removeUser(id)
    .then(wasDeleted => res.json(wasDeleted))
    .catch(err => res.json(err));
});

app.use("/",router);



