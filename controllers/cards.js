var express = require('express'),
    router = express.Router(),
    CardLog = require('../models/CardLog');

router.get('/log', function (req, res) {
    CardLog.find({}, function (err, cardLogs) {
        res.json(cardLogs);
    });
});

module.exports = router;