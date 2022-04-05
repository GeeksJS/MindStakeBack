var express = require('express');
var router = express.Router();
var FeedbackService = require('../Service/FeedbackService');

router.post('/addComment/:idUser/:idProject', function (req, res, next) {
    FeedbackService.addComment( req , req.params.idUser , req.params.idProject )
    .then(data => res.json(data))
    //  res.end();
});

router.post('/addReply/:idUser/:idComment', function (req, res, next) {
    FeedbackService.addReply( req , req.params.idUser , req.params.idComment )
    .then(data => res.json(data))
    //  res.end();
});

router.get('/getAllComments/:idProject', function (req, res, next) {
    FeedbackService.getAllComments(req.params.idProject)
    .then(data => res.json(data));
});

router.get('/getReplysByCommentId/:idComment', function (req, res, next) {
    FeedbackService.getReplysByCommentId(req.params.idComment)
    .then(data => res.json(data));
});

router.delete('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    FeedbackService.deleteCommentById(id);
    res.end()
  });

module.exports = router ;