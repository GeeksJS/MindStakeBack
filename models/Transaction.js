var mongoose = require('mongoose');
var shema = mongoose.Schema;
var transaction = new mongoose.Schema(
    {
        amount: {
            type: Number
        },

        created: {
            type: String
        },

        currency: {
            type:String
        },

        status: {
            type:String
        },

        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },




    }
)
module.exports = mongoose.model('transaction', transaction)