var mongoose = require('mongoose');
var shema = mongoose.Schema;
var user = new mongoose.Schema(
    {
        UserName: String,
        Email: String,
        Password: String,
        Role: {
            type: String,
            enum: ["SIMPLE_USER", "CREATOR", "INVESTOR", "ADMIN"],
            default: 'SIMPLE_USER'
        },
        Phone: Number
    }
)
/*user.pre('save', function() {
    const user = this;
})*/
module.exports = mongoose.model('users', user)
