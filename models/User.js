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
        StartupName: {
            type: String,
            required: false
        },
        Cv: {
            type: String,
            required: false
        },
        Typecreator: {
            type: String,

            enum: ["STARTUP", "INDIVIDUAL"]

        }, CompanyName: {
            type: String,
            required: false
        },
        Address: {
            street: String,
            city: String,
            code: String,
            country: String
        },
        ImageProfile: {
            type: String,
            required: false
        }
    }
)
module.exports = mongoose.model('users', user)
