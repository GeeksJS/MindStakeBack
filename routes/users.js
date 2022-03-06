var express = require('express');
var router = express.Router();
var User=require('../models/User')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var newuser = new User( {
    UserName: "monam",
    Email: "monam.bengouta@esprit.tn",
    Password: "monam",
    Role: "CREATOR",
    Phone: 27055177
});
newuser.save();
  res.send('respond with a resource');
});

module.exports = router;
