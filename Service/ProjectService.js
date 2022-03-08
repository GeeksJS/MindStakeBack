const Project = require('../models/Project')

// addproject methode
 const addProject = (projectData,idUser)=>{
    //initialise project with arguments

    
var project = new Project({
    Description: projectData.Description,
    Title: projectData.Title,
    Category: projectData.Category,
    CreationDate: Date.now() ,
    EndDate: projectData.EndDate ,
    Goal: projectData.Goal,
    Raised: 0,
    Picture: projectData.Picture ,
    Video: projectData.Video ,
    SocialMedia: projectData.SocialMedia,
    Approved: false,
    User: projectData.idUser,
    Payment:  []
});
   //save project with mongoose
  project.save();
};
 const deleteProject = (idProject)=>{
    Project.findOneAndDelete({_id:idProject}, (err) => {
        if (err) throw err;
    })

};


const getProjectByID =async (id)=>{
    //mongoose find method return alwaus promise
    return  await Project.find({_id: id.toString()})
     .then(data=>result = data)
     .catch(err=>console.log(err));
}

const getAllProjects = () =>{
    return Project.find();
}

const updateProject = (data,idProject)=>{
    Project.findByIdAndUpdate({_id : idProject.toString() },data);
}

module.exports = {addProject,deleteProject,getProjectByID,getAllProjects,updateProject};

/*

{
    "Description": "test",
    "Title": "title",
    "Category": "art",
    "EndDate": "02/02/2022" ,
    "Goal": 5000,
    "Picture": "picture.jpg" ,
    "Video": "video.jpg" ,
    "SocialMedia": "www.facebook.com",
    "User": 1
}

*/