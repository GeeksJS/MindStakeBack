var express = require('express');
const checkAuth = require('../middleware/check-auth');

const fileUpload = require('../middleware/image-upload');

var router = express.Router();
var Project = require('../models/Project');
var ProjectService = require('../Service/ProjectService');
var Projectpack = require('../models/ProjectPack');
var ProjectPackService = require('../Service/ProjectPackService');


router.use(checkAuth)
// Buy Pack For Project 
router.post('/BuyPackForProject/:idPack/:idProject', function (req, res, next) {
      const  idPack = req.params.idPack;
      const  idProject= req.params.idProject;
        ProjectPackService.buyPackForProject(idPack, idProject);
         res.end();
 });

 // get All Project By Pack 
 router.get('/getallprojectsByPack', function (req, res, next) {
        ProjectService.getAllProjectsByPack().then(data=>res.json(data));
});

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


router.get('/getallprojectsbycategory', function (req, res, next) {
        ProjectService.getAllProjectsByCategory().then(data=>res.json(data));
});

router.put('/updateprojectraised/:id', function (req, res, next) {
      
        ProjectService.updateProjectRaised(req,req.params.id);
        
        res.end()
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
