var express = require('express');
var router = express.Router();
var UserService = require('../Service/UserService');
const { check } = require('express-validator')
const imageUpload = require('../middleware/image-upload');
const pdfUpload = require('../middleware/pdf-upload');
const fileUpload = require('../middleware/image-upload');


/*begin Simple Crud User*/

router.post('/signup', fileUpload.any(), function (req, res) {
  console.log(req.body)
  console.log("file" + req.files[0].filename)
  //res.end()

  UserService.signup(req,res).then(data=>res.json(data)).catch(err=>console.log(err))
}
);


router.post('/login', function (req, res) {

  UserService.login(req, res).then(data => res.json(data)).catch(err => console.log(err))
}
);






/* AddSimpleUser */
router.post('/addUser', function (req, res, next) {
  UserService.addUser(req.body);
});

/*find User By Id*/
router.get('/:id', function (req, res, next) {
  UserService.displayUserById(req.params.id).then(data => res.json(data));
});

/*Update Creator By Id */
router.put('/update/:id',  fileUpload.any(),function (req, res, next) {
  var id = req.params.id;
  console.log(req.body)
  console.log("file aya" + req.files[0])
  UserService.updateUser(req, id,res).then(data => res.json(data)).catch(err=>console.log(err));

});

/*Update Investor By Id */
router.put('/updateInvestor/:id',  fileUpload.any(),function (req, res, next) {
  var id = req.params.id;
  console.log(req.body)
  console.log("file aya" + req.files[0])
  UserService.updateInvestor(req, id,res).then(data => res.json(data)).catch(err=>console.log(err));
});

/*Update SimpleUser By Id */
router.put('/updateSimpleUser/:id',  fileUpload.any(),function (req, res, next) {
  var id = req.params.id;
  console.log(req.body)
  console.log("file aya" + req.files[0])
  UserService.updateSimpleUser(req, id,res).then(data => res.json(data)).catch(err=>console.log(err));
});

/*****Change Password */
router.put('/changePassword/:id', function (req, res, next) {
  var id = req.params.id;
  UserService.change_password(req, id,res).then(data => console.log("data ") ).catch(err=>console.log(err));
});
/******** */
/*Delete User By Id*/
router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  UserService.deleteUserById(id);
});

/* find All Users*/
router.get('/', function (req, res, next) {
  UserService.displayAllUser().then(data => res.json(data));;
});
module.exports = router;