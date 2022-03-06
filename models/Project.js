var mongoose = require('mongoose');
var shema = mongoose.Schema;
var project = new mongoose.Schema(
    {
        Description: String,
        Title:String,
        Category: {
            type: String,
            enum: ['Art','Illustrations','Technologie','Cinema','Creations','Gaming','Music','Other'],
            default: 'Other'
        },
        CreationDate:Date,
        EndDate:Date,
        Goal: Number,
        Raised:Number,
        Picture:String,
        Video : String,
        SocialMedia:String,
        Approved:Boolean,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        payment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'payments' }]
    }
)
module.exports = mongoose.model('projects', project)
