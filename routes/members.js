const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.get('/', function(req, res, next) {
	res.render('index', { title: 'UBC Clubs' });
});

router.post('/signup', function (req, res, next) {
	//expect firstname, lastname, department, student_id, username
	Member.findOne(req.body)
	.then((member) => {
		if (member) {
			res.sendStatus(400, {err: 'Username already exists'});
		} else {
			return Member.create(req.body);
		}
	})
	.then((member) => {
		res.send(201, {success: 'Created new user'});
	})
	.catch((err) => {
		res.send(500, err);
	});
});

router.post('/login', function (req, res, next) {
	console.log('in here');
	//expect username password
	Member.findOne(req.body)
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
		console.log(err);
		res.send(500, err);
	});
});

module.exports = router;
