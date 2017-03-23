const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'UBC Clubs' });
});

router.get('/signup', function(req, res, next) {
    res.render('index', { title: 'UBC Clubs' });
});

router.get('/login', function(req, res, next) {
    res.render('index', { title: 'UBC Clubs' });
});

router.get('/dashboard', function(req, res, next) {
    res.render('index', { title: 'UBC Clubs' });
});

module.exports = router;
