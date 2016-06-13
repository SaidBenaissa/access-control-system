var chalk = require('chalk'),
    spawn = require('child_process').spawn,
    config = require('../config.json');


Fibaro = {
    setColor: function (deviceId, color) {
        if (config.ENABLE.FIBARO) {
            this._child = spawn(config.SCRIPT_PATH.FIBARO.COLOR, [color, deviceId]);
        } else {
            console.log(chalk.yellow("Fibaro is turned off in config file."));
        }
    },
    switch: function (deviceId, value) {
        if (config.ENABLE.FIBARO) {
            this._child = spawn(config.SCRIPT_PATH.FIBARO.SWITCH, [value, deviceId]);
        } else {
            console.log(chalk.yellow("Fibaro is turned off in config file."));
        }
    }
};

module.exports = Fibaro;