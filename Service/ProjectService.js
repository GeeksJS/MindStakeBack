const Project = require('../models/Project')

// addproject methode
function addProject(req, idUser) {
    //initialise project with arguments

    const {
        Description,
        Title,
        Category,
        EndDate,
        Goal,
        Raised,
        Picture,
        Video,
        Approved,
        SocialMedia } = req.body;

    const vid = () => {
        if (req.files) {
            if (req.files[1]) {
                return req.files[1].filename
            }
            else if (req.files[0].mimetype === "video/mp4") {
                return req.files[0].filename

            }
            else {
                return "video.mp4"
            }
        }
    }

    var project = new Project({
        Description,
        Title,
        Category,
        CreationDate: Date.now(),
        EndDate,
        Goal,
        Raised,
        Picture: req.files && req.files[0].mimetype !== "video/mp4" ? req.files[0].filename : 'project.png',
        Video: vid(),
        SocialMedia,
        Approved,
        User: idUser,
        Payment: []
    });
    //save project with mongoose
    project.save();
};
const deleteProject = (idProject) => {
    Project.findOneAndDelete({ _id: idProject }, (err) => {
        if (err) throw err;
    })

};


const getProjectByID = async (id) => {
    //mongoose find method return alwaus promise
    return await Project.find({ _id: id.toString() })
        .then(data => result = data)
        .catch(err => console.log(err));
}

const getProjectByUser = async (id) => {
    //mongoose find method return alwaus promise
    return await Project.find({ User: id.toString() })
        .then(data => result = data)
        .catch(err => console.log(err));
}

const getAllProjects = () => {
    return Project.find();
}

const updateProject = (data, idProject) => {
    Project.findByIdAndUpdate({ _id: idProject.toString() }, data);
}


 
 

/************Achref *************/

//Approve project
async function approveProject (data, idProject) {
    await Project.findByIdAndUpdate({ _id: idProject.toString() }, data)
    .then(data=>data)
}

module.exports = { addProject, deleteProject, getProjectByID, getAllProjects, updateProject , getProjectByUser,approveProject};

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