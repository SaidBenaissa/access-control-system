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
            this._child = spawn(config.SCRIPT_PATH.FIBARO.SWITCH, [deviceId + "", value + ""]);
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
    },
    setupDevices: function () {
        if (config.ENABLE.FIBARO) {
            console.log(chalk.yellow("We are now setting up devices before use."));
            this._child = spawn(config.SCRIPT_PATH.FIBARO.SETUP);
        }else{
            console.log(chalk.yellow("Fibaro is turned off in config file."));
        }
    }
};

module.exports = Fibaro;