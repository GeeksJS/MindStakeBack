var mongoose = require('mongoose');
var shema = mongoose.Schema;
var pack = new mongoose.Schema(
    {
        Description: String,
        level:Number,
        Price:Number,
        Title:Stirng,
        Duration:Number,
        Available:boolean,
        payment: [ { type: mongoose.Schema.Types.ObjectId, ref: 'payments' }]
    }
)
module.exports = mongoose.model('packs', pack)
