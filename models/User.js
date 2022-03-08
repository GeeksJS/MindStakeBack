var mongoose = require('mongoose');
var shema = mongoose.Schema;
var user = new mongoose.Schema(
    {
        UserName:
        {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        },
        Role: {
            type: String,
            enum: ["SIMPLE_USER", "CREATOR", "INVESTOR", "ADMIN"],
            default: 'SIMPLE_USER'
        },
        Phone: {
            type: Number,
            required: false
        },
    }
)
module.exports = mongoose.model('users', user)
