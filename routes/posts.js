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


router.post('/delete', function(req, res, next) {
	console.log('in delete', req.body);
  Post.deletePost(req.body)
  .then((post) => {
    res.send(post);
  })
  .catch((err) => {
    console.error(err);
    res.send(500, err);
  })
});

router.post('/post', function(req, res, next) {
	console.log('in delete', req.body);
  Post.createPost(req.body)
  .then((post) => {
    res.send(post);
  })
  .catch((err) => {
    console.error(err);
    res.send(500, err);
  })
});

router.post('/countpost', function(req, res, next) {
  Post.countPost(req.body)
  .then((post) => {
    res.send(post);
  })
  .catch((err) => {
    console.error(err);
    res.send(500, err);
  })
});


module.exports = router;