var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');

var BookmarkService = require('../Service/BookmarkService');
router.use(checkAuth)

router.post('/addBookmark/:idProject/:idUser', function (req, res, next) {
    BookmarkService.addBookmark(req.params.idProject,req.params.idUser);
     res.end();
});

router.get('/getBookmarks/:idUser',  function (req, res, next) {
    BookmarkService.getBookmarks(req.params.idUser).then(data => res.json(data));
});

router.delete('/deleteBookmark/:idProject/:idUser',(req,res,next)=>{      
    BookmarkService.deleteBookmark(req.params.idProject,req.params.idUser);
    res.end();  
})


module.exports = router ;