var net = require('net'),
    config = require('../config.json');


function TCPClient() {
    this._listeners = [];
}

TCPClient.prototype = {
    constructor: TCPClient,
    start: function () {
        if (config.ENABLE.FIBARO) {
            this._client = new net.Socket();
            this._client.connect(9876, config.SCRIPT_PATH.FIBARO, function () {
                console.log('TCP client started');
                this._client.write('Hello, server! Love, Client.');
            });
            this._client.on('data', this.handleData.bind(this));
            this._client.on('close', this.handleClose.bind(this));
        } else {
            console.log("TCP client to Fibaro is turned off in config file.");
        }
    },
    handleData: function (data) {
        console.log(data);
    },
    handleClose: function () {
        console.log('Connection to TCP closed');
    }
};

module.exports = TCPClient;