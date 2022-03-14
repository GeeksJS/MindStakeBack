var mongoose = require('mongoose');
var shema = mongoose.Schema;
var message = new mongoose.Schema(
    {
        Description: {
            type: String,
            required: true
        },
        Pair: { type: mongoose.Schema.Types.ObjectId, ref: 'pairs' },
        Message: [{ type: mongoose.Schema.Types.ObjectId, ref: 'messages'}],
        Conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'conversations' },

    }
)
module.exports = mongoose.model('messages', message)
