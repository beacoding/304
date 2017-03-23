const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/allmessages', function (req, res, next) {
  Message.findAll(req.query)
  .then((messages) => {
    res.send(messages);
  })
  .catch((err) => {
    res.send(500, err);
  });
});

router.get('/*', function(req, res, next) {
  res.render('index', { title: 'UBC Clubs' });
});

module.exports = router;
