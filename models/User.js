var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    },
    email: String,
    card: {
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }
});

module.exports = mongoose.model('User', UserSchema);
