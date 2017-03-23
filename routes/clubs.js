const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

router.get('/allclubs', function (req, res, next) {
  Club.findAllWithMember(req.query)
  .then((clubs) => {
    res.send(clubs);
  })
  .catch((err) => {
    console.error(err);
    res.send(500, err);
  })
});

router.get('/club', function (req, res, next) {
  Club.findOne(req.query)
  .then((club) => {
    res.send(club);
  })
  .catch((err) => {
    console.error(err);
    res.send(500, err);
  })
});

router.get('/*', function (req, res, next) {
  res.render('index', { title: 'UBC Clubs' });
});

module.exports = router;
