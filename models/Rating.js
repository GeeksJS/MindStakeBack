var mongoose = require('mongoose');
var shema = mongoose.Schema;
var rating = new mongoose.Schema(
    {
        Rate: Number,
        Project: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
 

    }
)
module.exports = mongoose.model('ratings', rating)
