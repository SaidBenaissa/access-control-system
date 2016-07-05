var chalk = require('chalk'),
    spawn = require('child_process').spawn,
    Fibaro = require('./Fibaro'),
    CardLog = require('../models/CardLog'),
    Card = require('../models/Card'),
    User = require('../models/User'),
    Socket = require('../models/Socket'),
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
        cardLog.save(function (err, cardLog) {
            Socket.find({}).populate('user').sort({socket_id: 'asc'}).exec(function (err, sockets) {
                Card.findOne({chipId: data}, function (err, card) {
                    if (card) {
                        User.findOne({card: card._id}, function (err, user) {
                            if (user.permissions) {
                                var socketStates = [],
                                    onArray = [],
                                    offArray = [];
                                for (var i = 1; i < 7; i++) {
                                    if (user.permissions['dev' + i]) {
                                        if (sockets[i - 1].user) {
                                            if (sockets[i - 1].user._id + "" == user._id + "") {
                                                sockets[i - 1].removeUser();
                                                sockets[i - 1].save();
                                                offArray.push(i + "", 0 + "");
                                            }
                                        } else {
                                            sockets[i - 1].addUser(user);
                                            sockets[i - 1].save();
                                            onArray.push(i + "", 1 + "");
                                        }
                                    }
                                }
                                if (offArray.length) {
                                    socketStates = offArray;
                                } else {
                                    socketStates = onArray.concat(offArray);
                                }
                                Fibaro.switchDevices(socketStates);
                            }
                        });
                    } else {
                        this._listeners.forEach(function (socket) {
                            socket.emit('card', {card: data});
                        });
                    }
                    this._listeners.forEach(function (socket) {
                        socket.emit('dashboard', cardLog);
                    });
                    this._listeners.forEach(function (socket) {
                        socket.emit('sockets');
                    });
                }.bind(this));
            }.bind(this))
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