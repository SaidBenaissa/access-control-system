var express = require('express'),
    router = express.Router(),
    Fibaro = require('../scripts/Fibaro');


router.post('/color', function (req, res) {
    Fibaro.setColor(req.body.deviceId, req.body.color);
});

router.post('/switch', function (req, res) {
    Fibaro.switch(req.body.deviceId, req.body.switch);
});

module.exports = router;