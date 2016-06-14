var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PermissionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dev1: Boolean,
    dev2: Boolean,
    dev3: Boolean,
    dev4: Boolean,
    dev5: Boolean,
    dev6: Boolean,
});

module.exports = mongoose.model('Permission', PermissionSchema);