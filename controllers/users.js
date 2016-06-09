var express = require('express'),
    router = express.Router();

router.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

module.exports = router;