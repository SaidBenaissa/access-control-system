var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardLogSchema = new Schema({
    chipId: String,
    date: new Date()
});

module.exports = mongoose.model('CardLog', CardLogSchema);
