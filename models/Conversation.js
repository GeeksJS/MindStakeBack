var mongoose = require('mongoose');
var shema = mongoose.Schema;
var conversation = new mongoose.Schema(
    {
        Body: String,
        CreationTime:Date,
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
       

    }
)
module.exports = mongoose.model('conversations', conversation)
