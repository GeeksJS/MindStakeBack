var mongoose = require('mongoose');
var shema = mongoose.Schema;
var adressuser = require('./adress');
var creator = new mongoose.Schema(
    {
        StartupName: String,
        cv:String,
        typecreator: {
            type: String,
            enum: ["STARTUP", "INDIVIDUAL"],
            default: 'INDIVIDUAL'
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    }
)
module.exports = mongoose.model('creators', creator)
