var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
    chipId: String,
    isActive: Boolean,
    userId: String
});

module.exports = mongoose.model('Card', CardSchema);
