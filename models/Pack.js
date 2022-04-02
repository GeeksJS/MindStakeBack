var mongoose = require('mongoose');
var shema = mongoose.Schema;
var pack = new mongoose.Schema(
    {
        Description: {
            type: String,
            required: true
        },
        Level:{
            type: Number,
            required: true
        },
        Price:{
            type: Number,
            required: true
        },
        Title:{
            type: String,  
            required: true
        },
        Duration:{
            type: String,
            enum: ['Month', 'Year']
        },
        Available:{
            type: Boolean,
            default: true
        },
        Features:[{ type: mongoose.Schema.Types.String, ref: 'features' }],
        Payment: [ { type: mongoose.Schema.Types.ObjectId, ref: 'payments' }]
    }
)
module.exports = mongoose.model('packs', pack)
