const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


router.get('/', function (req, res, next) {
  res.render('index', { title: 'UBC Clubs' });
});

router.get('/allposts', function (req, res, next) {
  Post.findAllWithClub(req.query)
  .then((posts) => {
    console.log(posts);
    res.send(posts);
  })
  .catch((err) => {
    res.send(500, err);
  });
});

module.exports = router;
