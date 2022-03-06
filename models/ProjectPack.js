var mongoose = require('mongoose');
var shema = mongoose.Schema;
var projectPack = new mongoose.Schema(
    {
        Buy_Date: Date,
        cv:String,
        pack: { type: mongoose.Schema.Types.ObjectId, ref: 'packs' },
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' }

    }
)
module.exports = mongoose.model('ProjectPacks', projectPack)
