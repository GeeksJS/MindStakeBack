var express = require('express');

const fileUpload = require('../middleware/image-upload');

var router = express.Router();
var Project = require('../models/Project');
var ProjectService = require('../Service/ProjectService');


router.post('/addproject/:iduser', fileUpload.any(), function (req, res, next) {
       ProjectService.addProject(req,req.params.iduser);
        res.end();
});


//delete project from database
router.delete('/deleteproject/:id',(req,res,next)=>{
        
        ProjectService.deleteProject(req.params.id);
        res.end();
        
})

//get Project by id

router.get('/getProjectByUser/:id', function (req, res, next) {
        //to get value from promise u should type `.then` method and give it callBack function
         ProjectService.getProjectByUser(req.params.id).then(data => res.json(data));
});

//get Project by id User
router.get('/getproject/:id',  function (req, res, next) {
        //to get value from promise u should type `.then` method and give it callBack function
         ProjectService.getProjectByID(req.params.id).then(data => res.json(data));
});



// get list of projects
router.get('/getallprojects', function (req, res, next) {
         ProjectService.getAllProjects().then(data=>res.json(data));
});

router.put('/updateproject/:id',fileUpload.any(), function (req, res, next) {
        console.log(req.files)
        ProjectService.updateProject(req,req.params.id);
        
        res.end()
});




/************Achref *************/ 
 
//Approve project
router.put('/approveproject/:id', function (req, res, next) {
        ProjectService.approveProject(req.body,req.params.id);
        res.end()
});



module.exports = router ;
