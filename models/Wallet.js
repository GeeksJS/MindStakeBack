const { ec } = require('elliptic');
const { any } = require('joi');
var mongoose = require('mongoose');
var shema = mongoose.Schema;
var wallet = new mongoose.Schema(
    {
        balance: {
            type: Number,
            default: 0
        },
        
        publicKey: {
            type: String
        },

        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }

    }
)
module.exports = mongoose.model('wallet', wallet)