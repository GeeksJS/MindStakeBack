const User = require('../models/User')
/* functio to add User*/
function addUser(req) {
  console.log(req);
  var newuser = new User({
    UserName: req.UserName,
    Email: req.Email,
    Password: req.Password,
    Role: req.Role,
    StartupName: req.StartupName,
    Cv: req.Cv,
    Typecreator: req.Typecreator,
    CompanyName: req.CompanyName,
    Address: req.Address,
  });
  newuser.save();

}
/* Function to display one User*/
async function displayUserById(id) {
  return await User.find({ _id: id.toString() })
    .then(data => data) /* mongoose find methode always return promise  */
    .catch(err => console.log(err));
}

/*Function Update */
function updateUser(req, id) {
  User.findByIdAndUpdate({ _id: id.toString() }, {
    UserName: req.UserName,
    Email: req.Email,
    Password: req.Password,
    Role: req.Role,
    Phone: req.Phone,
    StartupName: req.StartupName,
    Cv: req.Cv,
    Typecreator: req.Typecreator,
    CompanyName: req.CompanyName,
    Address: req.Address,
  },
    (err) => {
      if (err) throw err;
    });

}
/* Function to Delete one User*/
 function deleteUserById(id) {
  User.findOneAndRemove({ _id: id.toString() }, (err) => {
    if (err) throw err;
  })
}

/* Function to Display All User*/
async function displayAllUser() {
  return await User.find()
  .then(data => data) /* mongoose find methode always return promise  */
  .catch(err => console.log(err));
}
module.exports = { addUser, displayUserById, updateUser, deleteUserById , displayAllUser} 
