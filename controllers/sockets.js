var express = require('express'),
    router = express.Router(),
    Fibaro = require('../scripts/Fibaro'),
    Socket = require('../models/Socket');


router.post('/color', function (req, res) {
    Fibaro.setColor(req.body.deviceId, req.body.color, res);
});

router.post('/switch', function (req, res) {
    Fibaro.switch(req.body.deviceId, req.body.switch, res);
});

router.get('/', function (req, res) {
    Socket.find({}, function (err, sockets) {
        res.json(sockets);
    }).sort({socketId: 'asc'});
});

module.exports = router;