var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SocketSchema = new Schema({
    socket_id: String,
    active: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Socket', SocketSchema);
