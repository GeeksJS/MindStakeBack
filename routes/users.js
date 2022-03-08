var express = require('express');
var router = express.Router();
var User = require('../models/User')
var UserService = require('../Service/UserService')
/* GET users listing. */
// router.get('/', function (req, res, next) {
//   var newuser = new User({
//     UserName: "test",
//     Email: "test.test@esprit.tn",
//     Password: "test",
//     Role: "CREATOR",
//     Phone: 123456
//   });
//   newuser.save();
//   res.send('respond with a resource');
// });
/*begin Simple Crud User*/
/* Getting One by Id*/
router.post('/addUser', function (req, res, next) {
  UserService.addUser(req.body);
});
/*find User By Id*/
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  User.findById(id, function (err, data) {
    if (err) throw err;
    res.json(data)

  });
});

/*Update User By Id*/
router.post('/update/:id', function (req, res, next) {
  var id = req.params.id;
  User.findByIdAndUpdate({ _id: id }, {
    UserName: req.body.UserName,
    Email: req.body.Email,
    Password: req.body.Password,
    Role: req.body.Role,
    Phone: req.body.Phone
  },
    (err) => {
      if (err) throw err;
    });
  res.json(User);
});

/*Delete User By Id*/
router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  User.findOneAndRemove({ _id: id }, (err) => {
    if (err) throw err;
  })
});
/*Get All Users*/
router.get('/', function (req, res, next) {
  User.find(function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});
/*Get By Role */
router.get('/Role/:Role', function (req, res, next) {
  var role = req.params.Role;
  User.find({ Role: role }, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});
/*Get By Emain and Password */
router.post('/LoginE', function (req, res, next) {
  var password = req.body.Password;
  var email = req.body.Email;
  User.find({ Password: password, Email: email }, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});
/*Get By Username and Password */
router.post('/LoginU', function (req, res, next) {
  var username = req.body.UserName;
  var email = req.body.Email;
  User.find({ Password: password, UserName: username }, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});
module.exports = router;
