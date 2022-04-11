var mongoose = require('mongoose');
var shema = mongoose.Schema;
var conversation = new mongoose.Schema({

    members: {
        type: Array
    }
}, { timestamps: true })
module.exports = mongoose.model('conversations', conversation)