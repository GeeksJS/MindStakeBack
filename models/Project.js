var mongoose = require('mongoose');
var shema = mongoose.Schema;
var project = new mongoose.Schema(
    {
        Description: {
            type: String,
            required: true
        },
        Title: {
            type: String,
            required: true
        },
        Category: {
            type: String,


            enum: ['Art', 'Illustrations', 'Technology', 'Cinema', 'Creation', 'Gaming', 'Music', 'Other'],

            default: 'Other'
        },
        CreationDate: {
            type: Date,
            default: Date.now,
        },
        EndDate: {
            type: Date,
            required: false
        },
        Goal: {
            type: Number,
            required: true
        },
        Raised: {
            type: Number,

            required: false,
            default: 0

        },
        Picture: {
            type: String,
            required: true
        },
        Video: {
            type: String,
            required: false
        },
        SocialMedia: {
            type: String,
            required: false
        },
        Approved: {
            type: Boolean,
            default: false
        },

        User: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        Payment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'payments' }]
    }
)
module.exports = mongoose.model('projects', project)
