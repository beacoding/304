const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'UBC Clubs' });
});

router.post('/signup', function (req, res, next) {
	//expect firstname, lastname, department, student_id, username
	console.log('this is req', req.body);
	Member.findMember(req.body)
	.then((member) => {
		if (member) {
			res.sendStatus(400, {err: 'Username already exists'});
		} else {
			return Member.createMember(req.body);
		}
	})
	.then((member) => {
		res.send(201, {success: 'Created new user'});
	})
	.catch((err) => {
		console.log('this is errr', err);
		res.send(500, err);
	});
});

router.get('/login', function (req, res, next) {
	//expect username password
	Member.findMember(req.body.loginInfo)
	.then((member) => {
		if (member) {
			if (req.body.password === member.password) {
				res.send(200, member);
			} else {
				res.send(400, {err: 'Incorrect password'});
			}
		}
	})
	.catch((err) => {
		res.send(500, err);
	})
});

module.exports = router;
