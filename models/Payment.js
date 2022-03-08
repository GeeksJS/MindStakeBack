var mongoose = require('mongoose');
var shema = mongoose.Schema;
var payment = new mongoose.Schema(
    {
        DatePayment: {
            type: Date,
            default: Date.now
        },
        Amount:{
            type: Number,
            required: true
        },
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    }
)
module.exports = mongoose.model('payments', payment)
