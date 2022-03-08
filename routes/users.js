var express = require('express');
var router = express.Router();
var User = require('../models/User')

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
router.get('/', function (req, res, next) {
  User.find(function (err, data) {
    if (err) throw err;
    res.json(data);
});
});
module.exports = router;
