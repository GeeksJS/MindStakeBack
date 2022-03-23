const Comment = require('../models/Comment');
const Project = require('../models/Project');
const User = require('../models/User');


async function addComment(req, idUser, idProject) {
    const {
        Description } = req.body;

    const user = await User.findOne({ _id: idUser })
    const project = await Project.findOne({ _id: idProject })

    let comment = new Comment({
        Description,
        User: user,
        Project: project
    });
    comment.save()
}

async function addReply(req, idUser, idComment) {
    const {
        Description } = req.body;
    const user = await User.findOne({ _id: idUser })
    let reply = new Comment({
        Description,
        User: user
    });
    reply.save()
    const comm = await Comment.findOne({ _id: idComment })
    let comments = comm.Comment
    comments.push(reply)

    await Comment.findByIdAndUpdate({ _id: idComment.toString() }, {
        Comment: comments
    }).then()
        .catch(err => console.log(err))
}

async function getAllComments(idProject) {
    return await Comment.find({ Project: idProject });
}

async function getReplysByCommentId( idComment ) {
    const comm = await Comment.findOne({ _id: idComment })
    return await Comment.find({ _id: comm.Comment })
    .then()
    .catch(err => console.log(err))
}

async function deleteCommentById(id) {
    await Comment.findOneAndRemove({ _id: id.toString() }, (err) => {
      if (err) throw err;
    })
    
  }


module.exports = { addComment, addReply, getAllComments, getReplysByCommentId, deleteCommentById };