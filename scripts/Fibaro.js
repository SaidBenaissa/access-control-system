var chalk = require('chalk'),
    spawn = require('child_process').spawn,
    config = require('../config.json');


Fibaro = {
    setColor: function (deviceId, color, res) {
        if (config.ENABLE.FIBARO) {
            this._child = spawn(config.SCRIPT_PATH.FIBARO.COLOR, [color + "", deviceId + ""]);
        } else {
            console.log(chalk.yellow("Fibaro is turned off in config file."));
        }
        res.json(["ok"]);
    },
    switch: function (deviceId, value, res) {
        if (config.ENABLE.FIBARO) {
            this._child = spawn(config.SCRIPT_PATH.FIBARO.SWITCH, [value + "", deviceId + ""]);
        } else {
            console.log(chalk.yellow("Fibaro is turned off in config file."));
        }
        res.json(["ok"]);
    },
    switchDevices: function (socketStates) {
        if (config.ENABLE.FIBARO) {
            this._child = spawn(config.SCRIPT_PATH.FIBARO.SWITCH, socketStates);
        } else {
            console.log(chalk.yellow("Fibaro is turned off in config file."));
        }
        res.json(["ok"]);

    },
};

module.exports = Fibaro;