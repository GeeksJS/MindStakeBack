var mongoose = require('mongoose');
var shema = mongoose.Schema;
var complaint = new mongoose.Schema(
    {
        Description: {
            type: String,
            required: true
        },
        Title:{
            type: String,
            required: true
        },
        Treated: {
            type: Boolean,
            default: false
        },
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    }
)
module.exports = mongoose.model('complaints', complaint)
