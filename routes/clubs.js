const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'UBC Clubs' });
});

router.get('/allclubs', function (req, res, next) {
  Club.findAllWithMember(req.query)
  .then((clubs) => {
    res.send(clubs);
  })
  .catch((err) => {
    console.log(err);
    res.send(500, err);
  })
});

module.exports = router;
