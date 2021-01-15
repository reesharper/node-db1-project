const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  Account.get()
    .then(action => {
      res.status(200).json(action)
    })
    .catch(() => {
      res.status(400).json({ error: "could not find the accounts you were looking for" })
    })
});

server.get('/:id', (req, res) => {
  Account.get(req.params.id)
    .then(action => {
      if(action) {
        res.status(200).json(action)
      } else {
        res.status(404).json({ message: 'account not found, ID required' })
      }
    })
    .catch(() => {
      res.status(400).json({ error: `could not find the account with id of ${req.params.id}` })
    })
});

server.post('/', (req, res) => {
  Account.insert(req.body)
  .then(action => {
        res.status(201).json(action)
    })
    .catch(error => {
      res.status(400).json(error)
    })
});

server.put('/:id', (req, res) => {
  Account.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
      res.status(400).json(error)
    })
});

server.delete('/:id', (req, res) => {
  Account.remove(req.params.id)
  .then(action => {
    if(action) {
      res.status(200).json({ message: "the account has been deleted" })
    } else {
      res.status(404).json({ message: 'account not found, ID required' })
    }
  })
  .catch(() => {
    res.status(400).json({ error: `could not find the accounts with id of ${req.params.id}` })
  })
});

module.exports = server;
