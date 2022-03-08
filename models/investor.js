var mongoose = require('mongoose');
var shema = mongoose.Schema;
var adressuser = require('./adress');
var investor = new mongoose.Schema(
    {
        CompanyName: {
            type: String,
            required: true
        },
        Address: {
            street: String,
            city: String,
            code: String,
            country: String
        },
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    }
)
module.exports = mongoose.model('investors', investor)
