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



/*Update User By Id*/
router.post('/update/:id', function (req, res, next) {
  var id = req.params.id;
  UserService.updateUser(req.body, req.params.id);

});

/*Delete User By Id*/
router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  UserService.deleteUserById(id);
});

/* find All Admins*/
router.get('/admins', function (req, res, next) {
  UserService.displayAllAdmin().then(data => res.json(data));
});

/* find All users except admin*/
router.get('/users', function (req, res, next) {
  UserService.displayAllUsersExceptAdmin().then(data => res.json(data));
});

/* find All Users*/
router.get('/', function (req, res, next) {
  UserService.displayAllUser().then(data => res.json(data));
});

/*find User By Id*/
router.get('/:id', function (req, res, next) {
  UserService.displayUserById(req.params.id).then(data => res.json(data));
});


module.exports = router;