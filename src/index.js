const { getAllUsers, addUser, modifyUser, removeUser, getUser } = require('./user/user.service');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const router = express.Router();

app.set("port", process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
server.listen(app.get("port"));
server.on('error', (e) => {
  console.log(`Server throws error : `, e);
});
server.on('listening', () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

router.get('/users', (req, res) => {
  getAllUsers().then((users) =>
    res.json({
      users: users
    })
  );
});

router.post('/user', (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd).then((userId) =>
    res.json({
      userIdAdded: userId
    })
  );
});

router.get('/user/:id', (req, res) => {
  const id = req.params['id'];
  getUser(id).then((user) =>
      res.json({
        user: user
      })
    )
    .catch(err => res.json(err));
});


router.patch('/user', (req, res) => {
  const userToUpdate = req.body;
  modifyUser(userToUpdate)
    .then(wasUpdated => res.json(wasUpdated))
    .catch(err => res.json(err));
});

router.delete('/user/:id', (req, res) => {
  const id = req.params['id'];
  removeUser(id)
    .then(wasDeleted => res.json(wasDeleted))
    .catch(err => res.json(err));
});

app.use("/", router);



