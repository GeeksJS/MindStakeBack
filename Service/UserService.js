const User = require('../models/User')
const HttpError = require('../models/http-error')
const { Validator } = require('node-input-validator');
//---------------Google api library-------------
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("517644931989-igjmauces87orj0hvdr03168js1458e8.apps.googleusercontent.com");

//---------------Facebook api mehodes (facebook doesn't use library he use modulee )-------------
//fetch request
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const imageUpload = require('../middleware/image-upload')

const multer = require('multer')



async function signup(req, res) {


  const { UserName,
    FirstName,
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
        FirstName,
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
        userId: createdUser._id, Email: createdUser.Email, UserName: createdUser.UserName, FirstName: createdUser.FirstName, LastName: createdUser.LastName, Password: createdUser.Password, Role: createdUser.Role,
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

    userId: existingUser._id, user_id: existingUser._id, Email: existingUser.Email, UserName: existingUser.UserName, FirstName: existingUser.FirstName, LastName: existingUser.LastName, Role: existingUser.Role,
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

/*Function Update Creator */
async function updateUser(req, id, res) {
  const { UserName,
    FirstName,
    LastName,
    Email,
    Cv,
    StartupName,
    Phone,
    ImageProfile,
  } = req.body;
  console.log(req.files)


  if (req.files) {
    if (req.files.length == 2) {

      await User.findByIdAndUpdate({ _id: id.toString() }, {
        FirstName,
        LastName,
        Email,
        Phone,
        ImageProfile: req.files[0].filename,
        Cv: req.files[1].filename,
        StartupName
      })
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));

    } else if (req.files[0].mimetype === "application/pdf") {

      await User.findByIdAndUpdate({ _id: id.toString() }, {
        FirstName,
        LastName,
        Email,
        Phone,
        Cv: req.files[0].filename,
        StartupName,
      })
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));
    } else {

      await User.findByIdAndUpdate({ _id: id.toString() }, {
        FirstName,
        LastName,
        Email,
        Phone,
        ImageProfile: req.files[0].filename,
        StartupName,
      })
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));
    }

  } else {

    await User.findByIdAndUpdate({ _id: id.toString() }, {
      FirstName,
      LastName,
      Email,
      Phone,
      StartupName,
    })
      .then(data => data) /* mongoose find methode always return promise  */
      .catch(err => console.log(err));
  }
}
/************Update SimpleUser */


async function updateSimpleUser(req, id, res) {
  const { UserName,
    FirstName,
    LastName,
    Email,
    Phone,
    ImageProfile,
  } = req.body;
  console.log(req.files)
  if (req.files) {
    await User.findByIdAndUpdate({ _id: id.toString() }, {
      FirstName,
      LastName,
      Email,
      Phone,
      ImageProfile: req.files[0].filename

    })
      .then(data => data) /* mongoose find methode always return promise  */
      .catch(err => console.log(err));
  } else {
    await User.findByIdAndUpdate({ _id: id.toString() }, {
      FirstName,
      LastName,
      Email,
      Phone
    })
      .then(data => data) /* mongoose find methode always return promise  */
      .catch(err => console.log(err));
  }
}
/*************************** Update Investor */
async function updateInvestor(req, id, res) {
  const { UserName,
    FirstName,
    LastName,
    Email,
    Phone,
    CompanyName,
    ImageProfile,
  } = req.body;
  console.log(req.files)
  if (req.files) {
    await User.findByIdAndUpdate({ _id: id.toString() }, {
      FirstName,
      LastName,
      Email,
      Phone,
      CompanyName,
      ImageProfile: req.files[0].filename,
      StartupName
    })
      .then(data => data) /* mongoose find methode always return promise  */
      .catch(err => console.log(err));
  } else {
    await User.findByIdAndUpdate({ _id: id.toString() }, {
      FirstName,
      LastName,
      Email,
      CompanyName,
      Phone
    })
      .then(data => data) /* mongoose find methode always return promise  */
      .catch(err => console.log(err));
  }
}

/**************** */

/********* Update Password*/

async function change_password(req, id, res) {

  try {
    const v = new Validator(req.body, {
      old_Password: 'required',
      new_Password: 'required',
      confirm_Password: 'required|same:new_Password'
    });

    const matched = await v.check();

    if (!matched) {
      return res.status(422).send(v.errors);
    }

    let current_user = await User.findOne({ _id: id })
    console.log(current_user.UserName)
    if (bcrypt.compareSync(req.body.old_Password, current_user.Password)) {

      let hashPassword = bcrypt.hashSync(req.body.new_Password, 10);
      await User.updateOne({
        _id: current_user._id
      }, {
        Password: hashPassword
      });

      return res.status(200).send({
        message: 'Password successfully updated',
        data: current_user,
      });

    } else {
      return res.status(400).send({
        message: 'Old Password does not matched',
        data: {}
      });
    }



  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err
    });
  }

}

/****** */
/*************** */
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



/**************Achref**************/
/* Function to Display All admins*/
async function displayAllAdmin() {
  return await User.find({ Role: 'ADMIN' })
    .then(data => data) /* mongoose find methode always return promise  */
    .catch(err => console.log(err));
}

/* Function to Display All users except ADMIN*/
async function displayAllUsersExceptAdmin() {
  return await User.find({ Role: ["SimpleUser", "Creator", "Investor"] })
    .then(data => data) /* mongoose find methode always return promise  */
    .catch(err => console.log(err));
}

//************************login with google *************************

function LoginWithGoogle(req, res, next) {
  const { tokenId } = req.body;
  client.verifyIdToken({ idToken: tokenId, audience: "517644931989-igjmauces87orj0hvdr03168js1458e8.apps.googleusercontent.com" }).then(response => {
    const { email_verified, name, email } = response.payload;
    if (email_verified) {
      User.findOne({ Email : email }).exec((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "This user doesn't exist, signup first"
          })
        } else {
          if (user) {
            let token;
            token = jwt.sign(
              { userId: user._id, Email: user.Email },
              'supersecret_dont_share',
              { expiresIn: '3h' }
            );

            res.json({

              userId: user._id, user_id: user._id, Email: user.Email, UserName: user.UserName, FirstName: user.FirstName, LastName: user.LastName, Role: user.Role,
              StartupName: user.StartupName, ImageProfile: user.ImageProfile, Cv: user.Cv, Typecreator: user.Typecreator,
              Phone: user.Phone, CompanyName: user.CompanyName, Address: user.Address, isActivated: user.isActivated, token: token

            });
          } else {
            let password = email;
            let newUser = new User({
              UserName: response.payload.name,
              FirstName: response.payload.given_name,
              LastName: response.payload.family_name,
              Email: response.payload.email,
              Password: password
            });
            newUser.save((err, data) => {
              if (err) {
                return res.status(400).json({ error: "someting went wrong..." });
              }
              let token;
              token = jwt.sign(
                { userId: data._id, Email: data.Email },
                'supersecret_dont_share',
                { expiresIn: '3h' }
              );

              res.json({

                userId: data._id, user_id: data._id, Email: data.Email, UserName: data.UserName, FirstName: data.FirstName, LastName: data.LastName, Role: data.Role,
                StartupName: data.StartupName, ImageProfile: data.ImageProfile, Cv: data.Cv, Typecreator: data.Typecreator,
                Phone: data.Phone, CompanyName: data.CompanyName, Address: data.Address, isActivated: data.isActivated, token: token

              });



            });
          }
        }
      })
    }
  });
}

function LoginWithFacebook(req, response, next) {

  const { userID, accessToken,name,emailAdresse } = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
  fetch(urlGraphFacebook, {
    method: 'GET'
  })
    .then(res => {
      const { email} = res;
      User.findOne({ email }).exec((err, user) => {
        if (err) {
          return response.status(400).json({
            error: "This user doesn't exist, signup first"
          })
        } else {
          if (user) {
            console.log(user)
            let token;
            token = jwt.sign(
              { userId: user._id, Email: user.Email },
              'supersecret_dont_share',
              { expiresIn: '3h' }
            );

            response.json({

              userId: user._id, user_id: user._id, Email: user.Email, UserName: user.UserName, FirstName: user.FirstName, LastName: user.LastName, Role: user.Role,
              StartupName: user.StartupName, ImageProfile: user.ImageProfile, Cv: user.Cv, Typecreator: user.Typecreator,
              Phone: user.Phone, CompanyName: user.CompanyName, Address: user.Address, isActivated: user.isActivated, token: token

            });
          } else {
            console.log(emailAdresse);
            let newUser = new User({
              UserName: name,
              FirstName: name.substring(0,name.indexOf(" ")+1),
              LastName: name.substring(name.indexOf(" ")+1,name.length),
              Email: emailAdresse,
              Password: emailAdresse
            });
            newUser.save((err, data) => {
              if (err) {
                return response.status(400).json({ error: "someting went wrong..." });
              }
              let token;
              token = jwt.sign(
                { userId: data._id, Email: data.Email },
                'supersecret_dont_share',
                { expiresIn: '3h' }
              );

              response.json({
                userId: data._id, user_id: data._id, Email: data.Email, UserName: data.UserName, FirstName: data.FirstName, LastName: data.LastName, Role: data.Role,
                StartupName: data.StartupName, ImageProfile: data.ImageProfile, Cv: data.Cv, Typecreator: data.Typecreator,
                Phone: data.Phone, CompanyName: data.CompanyName, Address: data.Address, isActivated: data.isActivated, token: token

              });



            });
          }
        }

      });

    })
}









module.exports = { LoginWithFacebook, LoginWithGoogle, addUser, displayUserById, updateUser, deleteUserById, displayAllUser, displayAllAdmin, displayAllUsersExceptAdmin, signup, login, updateSimpleUser, updateInvestor, change_password }

