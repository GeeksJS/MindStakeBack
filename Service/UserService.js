const { json } = require('express/lib/response');
const User = require('../models/User')

function addUser(req){
    
    console.log(req);
    var newuser = new User({
        UserName: req.UserName,
        Email: req.Email,
        Password: req.Password,
        Role: req.Role,
        Phone: req.Phone,
      });
      newuser.save();
      res.send('respond with a resource');
}
module.exports = {addUser} 
