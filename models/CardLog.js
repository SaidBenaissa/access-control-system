var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardLogSchema = new Schema({
    chipId: String,
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('CardLog', CardLogSchema);
