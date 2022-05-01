
const projectPack = require('../models/ProjectPack');
const Pack = require('../models/Pack');
const Project = require('../models/Project');


async function buyPackForProject(idPack, idProject) {
    
    PackInfo = await Pack.findOne({ _id: idPack.toString() });

    var newBuy = new projectPack({
        Project: idProject,
        Pack: idPack,
    });

   const ProjectInfo = await Project.findOne({ _id:  idProject.toString() });
   ProjectInfo.Level =  ProjectInfo.Level + PackInfo.Level;
   ProjectInfo.save();
    newBuy.save();

}

module.exports = {buyPackForProject};