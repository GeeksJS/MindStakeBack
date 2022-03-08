var express = require('express');
var router = express.Router();
var Project = require('../models/Project');
var ProjectService = require('../Service/ProjectService');

router.post('/addproject/:iduser', function (req, res, next) {
       ProjectService.addProject(req.body,req.params.iduser);
        res.end();
});


//delete project from database
router.delete('/deleteproject/:id',(req,res,next)=>{
        
        ProjectService.deleteProject(req.params.id);
        res.end();
        
})

//get Project by id
router.get('/getproject/:id', function (req, res, next) {
        //to get value from promise u should type `.then` method and give it callBack function
         ProjectService.getProjectByID(req.params.id).then(data => res.json(data));

});
// get list of projects
router.get('/getallprojects', function (req, res, next) {
         ProjectService.getAllProjects().then(data=>res.json(data));
});

router.put('/updateproject/:id', function (req, res, next) {
        ProjectService.updateProject(req.body,req.param.id);
});













module.exports = router ;
