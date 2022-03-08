var mongoose = require('mongoose');
var shema = mongoose.Schema;
var projectPack = new mongoose.Schema(
    {
        Buy_Date:   {
            type: Date,
            default: Date.now,
            required: true
        },
        Pack: { type: mongoose.Schema.Types.ObjectId, ref: 'packs' },
        Project: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' }

    }
)
module.exports = mongoose.model('ProjectPacks', projectPack)
