const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

router.get('/allclubs', function (req, res, next) {
  Club.findAll()
  .then((clubs) => {
    res.send(clubs);
  })
  .catch((err) => {
    console.error(err);
    res.send(500, err);
  })
});

router.get('/allclubswithmember', function (req, res, next) {
  Club.findAllWithMember(req.query)
  .then((clubs) => {
    res.send(clubs);
  })
  .catch((err) => {
    console.error(err);
    res.send(500, err);
  })
});



//TODO: find all members who are part of all clubs
router.get('/allMembersWhoArePartOfAllClubs', function (req,res,next) {
    Club.findAllWithAllMember2()
        .then((members) => {
            res.send(members);
        })
        .catch((err) =>{
            console.error(err);
            res.send(500, err);
    })
});

//TODO: find number of members in a club
router.get('/numberOfClubs', function (req,res,next) {
    Club.countNumberOfElement()
        .then((clubs) =>{
          res.send(clubs);
        }).catch((err) =>{
          console.error(err);
          res.send(500, err);
    })
});


router.get('/club', function (req, res, next) {
  Club.findClubAndIfMember(req.query)
      .then((club) => {
    if (club) {
      res.send(club);
    } else {
      res.send(404, {'err': 'No club with that name'});
    }
  })
  .catch((err) => {
    console.error(err);
    res.send(500, err);
  })
});

router.post('/create', function(req, res, next) {
  Club.create(req.body)
  .then((club) => {
    res.send(club);
  })
  .catch((err) => {
    console.error(err);
    res.send(500, err);
  })
});

router.post('/join', function(req, res, next) {
  console.log('this is req.body', req.body);
  Club.joinClub(req.body)
  .then((club) => {
    res.send(club);
  })
  .catch((err) => {
    console.error(err);
    res.send(500, err);
  })
})

router.get('/*', function (req, res, next) {
  res.render('index', { title: 'UBC Clubs' });
});

module.exports = router;
