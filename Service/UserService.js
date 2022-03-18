const User = require('../models/User')
const HttpError = require('../models/http-error')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const imageUpload = require('../middleware/image-upload')

const multer = require('multer')



async function signup(req, res) {


  const { UserName,
    FistName,
    LastName,
    Email,
    Password,
    Role,
    Cv,
    StartupName,
    Phone,
    Typecreator,
    CompanyName,
    Address,
    ImageProfile,
    isActivated } = req.body;


  // Validate user input
  if (!(UserName && Email && Password && Role)) {
    console.log("All input is required");
  }
  else {

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ Email });

    if (oldUser) {
      return null;
    }
    else {

      //Encrypt user password
      encryptedPassword = await bcrypt.hash(Password, 10);

      const pdf = () => {
        if (req.files) {
          if (req.files[1]) {
            return req.files[1].filename
          }
          else if (req.files[0].mimetype === "application/pdf") {
            return req.files[0].filename

          }
          else {
            return "default.pdf"
          }
        }
      }


      const createdUser = new User({
        UserName,
        FistName,
        LastName,
        Email,
        Password: encryptedPassword,
        Role,
        StartupName,
        ImageProfile: req.files && req.files[0].mimetype !== "application/pdf" ? req.files[0].filename : 'avatar.png',
        Cv: pdf(),
        Typecreator,
        Phone,
        CompanyName,
        Address,
        isActivated

      });

      let token;
      token = jwt.sign(
        { userId: createdUser._id },
        'supersecret_dont_share',
        { expiresIn: '1h' }
      );

      createdUser.save();

      console.log(token)



      return {
        userId: createdUser._id, Email: createdUser.Email, UserName: createdUser.UserName, FistName: createdUser.FistName, LastName: createdUser.LastName, Password: createdUser.Password, Role: createdUser.Role,
        StartupName: createdUser.StartupName, ImageProfile: createdUser.ImageProfile, Cv: createdUser.Cv, Typecreator: createdUser.Typecreator,
        Phone: createdUser.Phone, CompanyName: createdUser.CompanyName, Address: createdUser.Address, isActivated: createdUser.isActivated, token: token
      };

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

    userId: existingUser._id, Email: existingUser.Email, UserName: existingUser.UserName, FistName: existingUser.FistName, LastName: existingUser.LastName, Role: existingUser.Role,
    StartupName: existingUser.StartupName, ImageProfile: existingUser.ImageProfile, Cv: existingUser.Cv, Typecreator: existingUser.Typecreator,
    Phone: existingUser.Phone, CompanyName: existingUser.CompanyName, Address: existingUser.Address, isActivated: existingUser.isActivated, token: token

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
async function updateUser(req, id) {
  let User1;
  User1 = await User.findOne({ _id: id });
  isValidPassword = await bcrypt.compare(req.Password, User1.Password);
  if (!isValidPassword && req.Password != "") {
    console.log ("Incorrect Password")
  }else if(isValidPassword && req.Password != ""){
    console.log("change mdp")
    encryptedPassword = await bcrypt.hash(req.NewPassword, 10);
    await User.findByIdAndUpdate({ _id: id.toString() }, {
      UserName: req.UserName,
      FistName: req.FistName,
      LastName: req.LastName,
      Email: req.Email,
      Password: encryptedPassword,
      Role: req.Role,
      Phone: req.Phone,
      StartupName: req.StartupName,
      Cv: req.Cv,
      Typecreator: req.Typecreator,
      CompanyName: req.CompanyName,
      Address: req.Address,
    },).then(data => data) /* mongoose find methode always return promise  */
    .catch(err => console.log(err));
  }
  else{
    await User.findByIdAndUpdate({ _id: id.toString() }, req)
    .then(data => data) /* mongoose find methode always return promise  */
    .catch(err => console.log(err));

  }
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
