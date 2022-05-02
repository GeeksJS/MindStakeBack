var mongoose = require('mongoose');
var shema = mongoose.Schema;
var proposal = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
    investorId:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    ownerId:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    state : {
        type: String,
        enum: ["Approved", "Waiting", "Rejected", "Accepted"],
        default: 'Waiting'
    },
    object:{
        type: String
    },
    body :{
        type: String
    },
    amount :{
        type : Number
    }

});
module.exports = mongoose.model('proposals', proposal)