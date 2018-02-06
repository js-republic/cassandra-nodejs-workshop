const express = require('express');
const router = express.Router();
const {getAllUsers, addUser, modifyUser, removeUser, getUser} = require('./user.service');

router.get('/', (req, res) => {
  res.json({api: '/users'})
});

router.get('/users', (req, res) => {
  getAllUsers()
    .then((users) => res.json({users: users}))
    .catch(err => res.status(500).send(err));
});

router.post('/user', (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd)
    .then((userId) => res.json({userIdAdded: userId}))
    .catch(err => res.status(500).send(err));
});

router.get('/user/:id', (req, res) => {
  const id = req.params['id'];
  getUser(id)
    .then((user) => res.json({user: user}))
    .catch(err => res.status(500).send(err));
});


router.patch('/user', (req, res) => {
  const userToUpdate = req.body;
  modifyUser(userToUpdate)
    .then(wasUpdated => res.json(wasUpdated))
    .catch(err => res.status(500).send(err));
});

router.delete('/user/:id', (req, res) => {
  const id = req.params['id'];
  removeUser(id)
    .then(wasDeleted => res.json(wasDeleted))
    .catch(err => res.status(500).send(err));
});

module.exports = router;