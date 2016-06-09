var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    password: String,
    admin: Boolean,
    mail: String
});

module.exports = mongoose.model('User', UserSchema);
