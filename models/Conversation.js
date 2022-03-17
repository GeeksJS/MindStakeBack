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
        Pair: { type: mongoose.Schema.Types.ObjectId, ref: 'pairs' },
       

    }
)
module.exports = mongoose.model('conversations', conversation)
