var mongoose = require('mongoose');
var shema = mongoose.Schema;
var feature = new mongoose.Schema(
    {
        Description: {
            type: String,
            required: true
        }
       
    }
)
module.exports = mongoose.model('features', feature)
