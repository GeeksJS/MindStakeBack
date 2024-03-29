var mongoose = require('mongoose');
var shema = mongoose.Schema;
var donation = new mongoose.Schema(
    {
        amount: {
            type: Number
        },

        created: {
            type: String
        },

        Sender: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        Receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        Project: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
    }
)
module.exports = mongoose.model('donation', donation)