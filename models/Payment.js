var mongoose = require('mongoose');
var shema = mongoose.Schema;
var payment = new mongoose.Schema(
    {
        DatePayment: Date,
        Amount:Number,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    }
)
module.exports = mongoose.model('payments', payment)
