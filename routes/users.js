var express = require('express');
var router = express.Router();
var User = require('../models/User')
var UserService = require('../Service/UserService')

/*begin Simple Crud User*/

/* AddSimpleUser */
router.post('/addUser', function (req, res, next) {
  UserService.addUser(req.body);
});

/*find User By Id*/
router.get('/:id', function (req, res, next) {
   UserService.displayUserById(req.params.id).then(data => res.json(data));
});

/*Update User By Id*/
router.post('/update/:id', function (req, res, next) {
  var id = req.params.id;
  UserService.updateUser(req.body,req.params.id);

});

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