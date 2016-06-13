var express = require('express'),
    router = express.Router(),
    User = require('../models/User'),
    Card = require('../models/Card');

router.get('/', function (req, res) {
    User.find({}).populate('card')
        .exec(function (err, users) {
            res.json(users);
        });
});

router.post('/register', function (req, res) {
    var newUser = new User(req.body.personalInfo);
    newUser.save(function (err, user) {
        Card.findOne({chipId: req.body.cardInfo.chipId}, function (err, card) {
            if (!card) {
                var card = new Card(req.body.cardInfo);
                card.save(function (err, card) {
                    user.card = card._id;
                    user.save();

                });
            } else {
                user.card = card._id;
                user.save();
            }
        })

    });
});

module.exports = router;