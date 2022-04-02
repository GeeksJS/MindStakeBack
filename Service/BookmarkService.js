const Bookmark = require('../models/BookMark');
const Project = require('../models/Project');

async function addBookmark(idProject, idUser) {

    let bm = await Bookmark.find({ User: idUser.toString(), Project:idProject.toString() })
    if(bm){
        return console.log("already exists")
    }
    else {
        var bookmark = new Bookmark({
            Project: idProject,
            User: idUser
        });
        bookmark.save()
    }    
};

const getBookmarks = async (idUser) => {

    let bms = []
    await Bookmark.find({ User: idUser.toString() })
        .then(res => {
            for (let i = 0; i < res.length; i++) {
                bms.push(res[i].Project)
            }
        })
    return await Project.find({ _id: { $in: bms } })
}

const deleteBookmark = (idProject, idUser) => {
    Bookmark.findOneAndDelete({ Project: idProject, User:idUser }, (err) => {
        if (err) throw err;
    })
};


module.exports = { addBookmark, getBookmarks, deleteBookmark };