var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SocketLogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('SocketLog', SocketLogSchema);
