var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SocketSchema = new Schema({
    socketId: String,
    name: String,
    color: Number,
    updated: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Socket', SocketSchema);
