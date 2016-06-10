var spawn = require('child_process').spawn,
    CardLog = require('../models/CardLog'),
    config = require('../config.json');

function NfcReader() {
    this._listeners = [];
}

NfcReader.prototype = {
    constructor: NfcReader,
    start: function () {
        if (config.ENABLE.NFC) {
            this._child = spawn(config.SCRIPT_PATH.NFC);
            this._child.stdout.on('data', this.handleStdOut);
            this._child.stderr.on('data', this.handleStdErr);
            this._child.on('close', this.handleClose);
            console.log("NFC reader started");
        } else {
            console.log("NFC reader is turned off in config file.");
        }
    },
    handleStdOut: function (data) {
        var cardLog = new CardLog({chipId: data});
        cardLog.save(function () {
            this._listeners.forEach(function (socket) {
                socket.emit('card', {card: data});
            });
        }.bind(this));
    },
    handleStdErr: function (data) {
        console.log('stderr: ' + data);
    },
    handleClose: function (code) {
        console.log('closing code: ' + code);
        process.exit();
    },
    addListener: function (socket) {
        this._listeners.push(socket);
    }
};

module.exports = NfcReader;