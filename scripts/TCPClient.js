var chalk = require('chalk'),
    net = require('net'),
    config = require('../config.json');


function TCPClient() {
    this._listeners = [];
}

TCPClient.prototype = {
    constructor: TCPClient,
    start: function () {
        if (config.ENABLE.FIBARO) {
            this._client = new net.Socket();
            this._client.connect(config.FIBARO.PORT, config.FIBARO.URL, this.handleConnect.bind(this));
            this._client.on('data', this.handleData.bind(this));
            this._client.on('close', this.handleClose.bind(this));
        } else {
            console.log(chalk.yellow("TCP client to Fibaro is turned off in config file."));
        }
    },
    handleConnect: function () {
        console.log(chalk.green('TCP client started'));
        this._client.write('Hello, server! Love, Client.');
    },
    handleData: function (data) {
        console.log(data.toString());
    },
    handleClose: function () {
        console.log(chalk.red('Connection to TCP closed'));
        process.exit();
    }
};

module.exports = TCPClient;