var mongoose = require('mongoose');
var shema = mongoose.Schema;
var companies = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        fax: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        capital: {
            type: String,
            required: false
        },
        employees: {
            type: String,
            required: false
        },
        website: {
            type: String,
            required: false
        },
        manager: {
            type: String,
            required: false
        },
        interest_rate: {
            type: String,
            required: false
        }
        
    }
)
module.exports = mongoose.model('banks', companies)
