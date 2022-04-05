var mongoose = require('mongoose');
var shema = mongoose.Schema;
var message = new mongoose.Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String
    }
}, { timestamps: true })
module.exports = mongoose.model('messages', message)