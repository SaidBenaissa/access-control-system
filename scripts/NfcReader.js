var spawn = require('child_process').spawn;

function NfcReader() {
}

NfcReader.prototype = {
    constructor: NfcReader,
    start: function () {
        this._child = spawn('./read_nfc');
        this._child.stdout.on('data', this.handleStdOut);
        this._child.stderr.on('data', this.handleStdErr);
        this._child.on('close', this.handleClose);
        console.log("NFC reader started");
    },
    handleStdOut: function (data) {
        console.log('stdout: ' + data);
    },
    handleStdErr: function (data) {
        console.log('stderr: ' + data);
    },
    handleClose: function (code) {
        console.log('closing code: ' + code);
        process.exit()
    }
};

module.exports = NfcReader;