var mongoose = require('mongoose');
var shema = mongoose.Schema;
var complaint = new mongoose.Schema(
    {
        Description: String,
        Title:String,
        Treated: Boolean,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    }
)
module.exports = mongoose.model('complaints', complaint)
