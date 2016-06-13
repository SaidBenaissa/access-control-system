var chalk = require('chalk'),
    spawn = require('child_process').spawn,
    CardLog = require('../models/CardLog'),
    Card = require('../models/Card'),
    config = require('../config.json');

function NfcReader() {
    this._listeners = [];
}

NfcReader.prototype = {
    constructor: NfcReader,
    start: function () {
        if (config.ENABLE.NFC) {
            this._child = spawn(config.SCRIPT_PATH.NFC);
            this._child.stdout.on('data', this.handleStdOut.bind(this));
            this._child.stderr.on('data', this.handleStdErr.bind(this));
            this._child.on('close', this.handleClose.bind(this));
            console.log(chalk.green("NFC reader started"));
        } else {
            console.log(chalk.yellow("NFC reader is turned off in config file."));
        }
    },
    handleStdOut: function (data) {
        data = data.toString().trim();
        var cardLog = new CardLog({chipId: data});
        cardLog.save(function () {
            Card.findOne({chipId: data}, function (err, card) {
                if (card) {
                    // TODO: check permissions, turn on // off device
                } else {
                    this._listeners.forEach(function (socket) {
                        socket.emit('card', {card: data});
                    });
                }
            }.bind(this));
        }.bind(this));
    },
    handleStdErr: function (data) {
        console.log('stderr: ' + data);
    },
    handleClose: function (code) {
        console.log(chalk.red('NFC closing code: ' + code));
        process.exit();
    },
    addListener: function (socket) {
        this._listeners.push(socket);
    },
    removeListener: function (socket) {
        var index = this._listeners.indexOf(socket);
        if (index !== -1) {
            this._listeners.splice(index, 1);
        }
    }
};

module.exports = NfcReader;