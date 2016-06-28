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

SocketSchema.methods.removeUser = function () {
    this.user = undefined;
    this.active = false;
};

SocketSchema.methods.addUser = function (user) {
    this.user = user._id;
    this.active = true;
};

module.exports = mongoose.model('Socket', SocketSchema);
