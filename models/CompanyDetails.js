var mongoose = require('mongoose');
var shema = mongoose.Schema;
var companydetails = new mongoose.Schema(
    {
        serviceFee: Number,
        LowDebt: Number,
        TypeOfLoan:Boolean,
        Address: {
            street: String,
            city: String,
            code: String,
            country: String
        },
        FundingType: {
            type: String,
            enum: ['REWARD','DEBT','EQUITY'],
            default: 'DEBT'
        },
        CompanyName:String,      
    }
)
module.exports = mongoose.model('companydetails', companydetails)
