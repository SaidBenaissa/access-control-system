var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SkupinaSchema = new mongoose.Schema({
    nazov: { type: String, index: true },
    token: String,
    veduci: { type: Schema.Types.ObjectId, ref: 'User' },
    uzivatelia : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
mongoose.model('Group', SkupinaSchema);