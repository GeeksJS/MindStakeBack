var mongoose = require('mongoose');
var shema = mongoose.Schema;
var companydetails = new mongoose.Schema(
    {
        serviceFee: {
            type: Number,
            required: true
        },
        LowDebt: {
            type: NUmber,
            required: true
        },
        TypeOfLoan: {
            type: Number,
            required: true
        },
        Address: {
            street: String,
            city: String,
            code: String,
            country: String
        },
        FundingType: {
            type: String,
            enum: ['REWARD', 'DEBT', 'EQUITY'],
            default: 'DEBT'
        },
        CompanyName: {
            type: String,
            required: true
        },
    }
)
module.exports = mongoose.model('companydetails', companydetails)
