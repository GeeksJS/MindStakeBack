var mongoose = require('mongoose');
var shema = mongoose.Schema;
var conversation = new mongoose.Schema(
    {
        Body: {
            type: String,
            required: true
        },
        CreationTime:{
            type: Date,
            default: Date.now,
        },
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
       

    }
)
module.exports = mongoose.model('conversations', conversation)
