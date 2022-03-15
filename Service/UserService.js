const User = require('../models/User')
const HttpError = require('../models/http-error')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const imageUpload = require('../middleware/image-upload')



async function signup(req, res) {


  const { UserName,
    Email,
    Password,
    Role,
    Cv,
    StartupName,
    Typecreator,
    CompanyName,
    Address,
    ImageProfile } = req.body;


  // Validate user input
  if (!(UserName && Email && Password && Role)) {
    console.log("All input is required");
  }
  else {

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ Email });

    if (oldUser) {
      return console.log("User Already Exist. Please Login");
    }
    else {

      //Encrypt user password
      encryptedPassword = await bcrypt.hash(Password, 10);



      const createdUser = new User({
        UserName,
        Email,
        Password: encryptedPassword,
        Role,
        StartupName,
        Cv: req.files && req.files[0].filename.substring(req.files[0].filename.length-3,req.files[0].filename.length)==='pdf'? req.files[0].filename : req.files[1].filename,
        Typecreator,
        CompanyName,
        Address,
        ImageProfile: req.files && req.files[1].filename.substring(req.files[1].filename.length-3,req.files[1].filename.length)!=='pdf'? req.files[1].filename : req.files[0].filename,
      });


      let token;

      token = jwt.sign(
        { userId: createdUser._id },
        'supersecret_dont_share',
        { expiresIn: '1h' }
      );

      createdUser.save();

      console.log(token)


      return { createdUser: createdUser, token: token };
    }

  }



};



async function login(req, res) {
  const { Email, Password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ Email: Email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return { message: error.message, code: error.code };
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return { message: error.message, code: error.code };
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(Password, existingUser.Password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return { message: error.message, code: error.code };
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return { message: error.message, code: error.code };
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser._id, Email: existingUser.Email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return { message: error.message, code: error.code };
  }

  res.json({
    userId: existingUser._id,
    Email: existingUser.Email,
    token: token
  });
};















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
module.exports = { addUser, displayUserById, updateUser, deleteUserById, displayAllUser, signup, login } 
