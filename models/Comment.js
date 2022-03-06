var mongoose = require('mongoose');
var shema = mongoose.Schema;
var comment = new mongoose.Schema(
    {
        Description: String,
        DateCreate: Date,
        Project: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        Comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }]

    }
)
module.exports = mongoose.model('comments', comment)
