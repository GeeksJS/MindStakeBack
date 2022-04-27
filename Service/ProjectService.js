const Project = require('../models/Project')
const fileUpload = require('../middleware/image-upload');
const ProjectPack = require('../models/ProjectPack')
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
        SocialMedia,
        Location } = req.body;

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
        Location,
        User: idUser,
        Payment: []
    });
    //save project with mongoose
    project.save();
};
async function updateProjectRaised(req, idProject) {
    const raised = req.body.Raised
    const project = await Project.findOne({ _id: idProject.toString() })
    project.Raised = raised
    project.save()
}
async function updateProject(req, idProject) {

    const {
        Description,
        Title,
        Category,
        Goal,
        Raised } = req.body;

    const vid = () => {
        console.log('vidddd')
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
    //*************************** */
    // await User.findByIdAndUpdate({ _id: id.toString() }, {
    //     FistName,
    //     LastName,
    //     Email,
    //     Phone,
    //     ImageProfile: req.files[0].filename,
    //     Cv: req.files[1].filename,
    //     StartupName
    //   })
    //     .then(data => data) /* mongoose find methode always return promise  */
    //     .catch(err => console.log(err));
    if (req.files) {
        console.log("files")
        await Project.findByIdAndUpdate({ _id: idProject.toString() }, {
            Description,
            Title,
            Category,
            Goal,
            Picture: req.files && req.files[0].mimetype !== "video/mp4" ? req.files[0].filename : 'project.png',
            Video: vid(),
        }).then(data => data)
            .catch(err => console.log(err))
    } else {
        await Project.findByIdAndUpdate({ _id: idProject.toString() }, {
            Description,
            Title,
            Category,
            Goal,
        }).then(data => data)
            .catch(err => console.log(err))
    }

    //************************* */


    // currentProject = { ...currentProject,
    //     Description,
    //     Title,
    //     Category,
    //     Goal,
    //     Picture: req.files && req.files[0].mimetype !== "video/mp4" ? req.files[0].filename : 'project.png',
    //     Video: vid(),
    // }

    // currentProject.save();
}

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

// const updateProject = (data, idProject) => {
//     Project.findByIdAndUpdate({ _id: idProject.toString() }, data);
// }







/************Achref *************/

//Approve project
async function approveProject(data, idProject) {
    await Project.findByIdAndUpdate({ _id: idProject.toString() }, data)
        .then(data => data)
}

// Get All Project By Level Pack 
const getAllProjectsByPack = () => {
   const data =  Project.find().sort({"Level": -1});
       
return data 
    

}


module.exports = { addProject, deleteProject, getProjectByID, getAllProjects, updateProject, getProjectByUser, approveProject, updateProjectRaised, getAllProjectsByPack };


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