var mongoose = require('mongoose');
var shema = mongoose.Schema;
var question = new mongoose.Schema(
    {
        Question: String,
        Response: {
            contents:string,
        },
    }
)
module.exports = mongoose.model('questions', question)
