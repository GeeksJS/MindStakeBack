
const projectPack = require('../models/ProjectPack');
const Pack = require('../models/Pack');
const Project = require('../models/Project');


async function buyPackForProject(req) {
    
    PackInfo = await Pack.findOne({ _id:  req.body.packId.toString() });

    var newBuy = new projectPack({
        Project: req.body.projectId,
        Pack: req.body.packId,
    });

   const ProjectInfo = await Project.findOne({ _id:  req.body.projectId.toString() });
   ProjectInfo.Level =   PackInfo.Level;
   ProjectInfo.save();
    newBuy.save();

}

module.exports = {buyPackForProject};