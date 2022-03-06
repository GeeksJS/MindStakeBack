var mongoose = require('mongoose');
var shema = mongoose.Schema;
var pair = new mongoose.Schema(
    {
     
        FirstUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        SecondUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }

    }
)
module.exports = mongoose.model('pairs', pair)
