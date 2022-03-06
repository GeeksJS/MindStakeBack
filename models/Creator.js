var mongoose = require('mongoose');
var shema = mongoose.Schema;
var adressuser = require('./adress');
var creator = new mongoose.Schema(
    {
        StartupName: String,
        Cv:String,
        Typecreator: {
            type: String,
            enum: ["STARTUP", "INDIVIDUAL"],
            default: 'INDIVIDUAL'
        },
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    }
)
module.exports = mongoose.model('creators', creator)
