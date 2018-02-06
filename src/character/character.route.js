const express = require('express');
const router = express.Router();
const {getAllCharacters, addCharacter, modifyCharacter, removeCharacter, getCharacter} = require('./character.service');

router.get('/', (req, res) => {
  res.json({api: '/characters'})
});

router.get('/characters', (req, res) => {
  getAllCharacters()
    .then((characters) => res.json({characters: characters}))
    .catch(err => res.status(500).send(err));
});

router.post('/character', (req, res) => {
  const characterToAdd = req.body;
  addCharacter(characterToAdd)
    .then((characterId) => res.json({characterIdAdded: characterId}))
    .catch(err => res.status(500).send(err));
});

router.get('/character/:id', (req, res) => {
  const id = req.params['id'];
  getCharacter(id)
    .then((character) => res.json({character: character}))
    .catch(err => res.status(500).send(err));
});


router.patch('/character', (req, res) => {
  const characterToUpdate = req.body;
  modifyCharacter(characterToUpdate)
    .then(wasUpdated => res.json(wasUpdated))
    .catch(err => res.status(500).send(err));
});

router.delete('/character/:id', (req, res) => {
  const id = req.params['id'];
  removeCharacter(id)
    .then(wasDeleted => res.json(wasDeleted))
    .catch(err => res.status(500).send(err));
});

module.exports = router;