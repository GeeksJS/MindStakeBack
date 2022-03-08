var mongoose = require('mongoose');
var shema = mongoose.Schema;
var question = new mongoose.Schema(
    {
        Question:{
            type: String,
            required: true
        },
        Response: {
            contents:string,
        },
    }
)
module.exports = mongoose.model('questions', question)
