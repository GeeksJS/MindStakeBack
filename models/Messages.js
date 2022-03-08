var mongoose = require('mongoose');
var shema = mongoose.Schema;
var message = new mongoose.Schema(
    {
        Description: {
            type: String,
            required: true
        },
        Pair: { type: mongoose.Schema.Types.ObjectId, ref: 'pairs' },
        Message: [{ type: mongoose.Schema.Types.ObjectId, ref: 'messages'}]

    }
)
module.exports = mongoose.model('messages', message)
