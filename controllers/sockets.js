var express = require('express'),
    router = express.Router(),
    Fibaro = require('../scripts/Fibaro'),
    Socket = require('../models/Socket');


router.post('/color', function (req, res) {
    Fibaro.setColor(req.body.deviceId, req.body.color, res);
});

router.post('/switch', function (req, res) {
    if (req.body.switch == 0) {
        Socket.findOne({socket_id: req.body.deviceId}, function (socket) {
            if (socket) {
                socket.removeUser();
                socket.save();
            }
        })
    }
    Fibaro.switch(req.body.deviceId, req.body.switch, res);
});

router.get('/', function (req, res) {
    Socket.find({}).sort({socket_id: 'asc'}).populate('user').exec(function (err, sockets) {
        res.json(sockets);
    });
});

module.exports = router;