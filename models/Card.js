var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
    chipId: String,
    isActive: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Card', CardSchema);
