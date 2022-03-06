var mongoose = require('mongoose');
var shema = mongoose.Schema;
var adressuser = require('./adress');
var investor = new mongoose.Schema(
    {
       CompanyName: String,
       address: {
        street: String,
        city: String,
        code: String,
        country: String
    },
       user:{type: mongoose.Schema.Types.ObjectId,ref:'users'}
    }
)
module.exports = mongoose.model('investors', investor)
