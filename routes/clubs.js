const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.get('/', function (req, res, next) {
    res.render('index', { title: 'UBC Clubs' });
});

module.exports = router;
