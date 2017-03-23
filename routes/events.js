const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/allevents', function (req, res, next) {
  Event.findAllWithClub(req.query)
  .then((events) => {
    res.send(events);
  })
  .catch((err) => {
    res.send(500, err);
  });
});

router.get('/*', function(req, res, next) {
  res.render('index', { title: 'UBC Clubs' });
});

module.exports = router;
