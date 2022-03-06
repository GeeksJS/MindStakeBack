var mongoose = require('mongoose');
var shema = mongoose.Schema;
var bookmark = new mongoose.Schema(
    {
        Project: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    

    }
)
module.exports = mongoose.model('bookmarks', bookmark)
