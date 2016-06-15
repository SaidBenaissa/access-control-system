var express = require('express'),
    router = express.Router(),
    CardLog = require('../models/CardLog');

router.get('/log', function (req, res) {
    CardLog.find({}).sort({date: 'desc'}).limit(15).exec(function (err, cardLogs) {
        res.json(cardLogs);
    });
});

module.exports = router;