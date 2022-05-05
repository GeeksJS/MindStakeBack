const User = require('../models/User')
const HttpError = require('../models/http-error')
const { Validator } = require('node-input-validator');
const sendEmail = require("../util/sendEmail");

//---------------Google api library-------------
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("517644931989-igjmauces87orj0hvdr03168js1458e8.apps.googleusercontent.com");

//---------------Facebook api mehodes (facebook doesn't use library he use modulee )-------------
//fetch request
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


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
        'supersecret_dont_share'
      );
      
 
      createdUser.save();

      console.log(token)

      await sendEmail({
        email: createdUser.Email, subject: "Account activation", html: `
   
        <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Reset Your Lingo Password</title>
      <!--[if !mso]>
          <!-- -->
      <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:768px){
              .templateContainer{
                  width:600px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body,table,td,p,a,li,blockquote{
                  -webkit-text-size-adjust:none !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body{
                  width:100% !important;
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              #bodyCell{
                  padding-top:10px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImage{
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
             
       .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                  max-width:100% !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnBoxedTextContentContainer{
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupContent{
                  padding:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnCaptionLeftContentOuter
       .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                  padding-top:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardTopImageContent,.mcnCaptionBlockInner
       .mcnCaptionTopContent:last-child .mcnTextContent{
                  padding-top:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardBottomImageContent{
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockInner{
                  padding-top:0 !important;
                  padding-bottom:0 !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockOuter{
                  padding-top:9px !important;
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnTextContent,.mcnBoxedTextContentColumn{
                  padding-right:18px !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                  padding-right:18px !important;
                  padding-bottom:0 !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcpreview-image-uploader{
                  display:none !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 1
          @tip Make the first-level headings larger in size for better readability
       on small screens.
          */
              h1{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 2
          @tip Make the second-level headings larger in size for better
       readability on small screens.
          */
              h2{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 3
          @tip Make the third-level headings larger in size for better readability
       on small screens.
          */
              h3{
                  /*@editable*/font-size:18px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 4
          @tip Make the fourth-level headings larger in size for better
       readability on small screens.
          */
              h4{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Boxed Text
          @tip Make the boxed text larger in size for better readability on small
       screens. We recommend a font size of at least 16px.
          */
              .mcnBoxedTextContentContainer
       .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Visibility
          @tip Set the visibility of the email's preheader on small screens. You
       can hide it to save space.
          */
              #templatePreheader{
                  /*@editable*/display:block !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Text
          @tip Make the preheader text larger in size for better readability on
       small screens.
          */
              #templatePreheader .mcnTextContent,#templatePreheader
       .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Header Text
          @tip Make the header text larger in size for better readability on small
       screens.
          */
              #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Body Text
          @tip Make the body text larger in size for better readability on small
       screens. We recommend a font size of at least 16px.
          */
              #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Footer Text
          @tip Make the footer content text larger in size for better readability
       on small screens.
          */
              #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }
      </style>
    </head>
    
    <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     background-color: #02a95c; height: 100%; margin: 0; padding: 0; width: 100%">
      <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
     100%; background-color: #02a95c; height: 100%; margin: 0; padding: 0; width:
     100%" width="100%">
          <tr>
            <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
     height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
              <!-- BEGIN TEMPLATE // -->
              <!--[if gte mso 9]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                      <td align="center" valign="top" width="600" style="width:600px;">
                      <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
     600px; border: 0" width="100%">
                <tr>
                  <td id="templatePreheader" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #02a95c;
     border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
     100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
     color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 12px;
     line-height: 150%; text-align: left; padding-top:9px; padding-right: 18px;
     padding-bottom: 9px; padding-left: 18px;' valign="top">
                                    <a href="https://www.lingoapp.com" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #02a95c;
     font-weight: normal; text-decoration: none" target="_blank" title="Lingo is the
     best way to organize, share and use all your visual assets in one place -
     all on your desktop.">
                                      <h1 class="null" style='color: white; font-family: "Asap", Helvetica,
     sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height:
     125%; letter-spacing: 2px; text-align: left; display: block; margin: 0;
     padding: 0'><span style="text-transform:uppercase">Mindstake</span></h1>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateHeader" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff;
     border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
     100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
     padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top">
                                    <a class="" href="https://www.lingoapp.com" style="mso-line-height-rule:
     exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
     #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                      <a class=""  style="mso-line-height-rule:
     exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
     #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                        <img align="center" alt="Forgot your password?" class="mcnImage" src="https://cdn1.iconfinder.com/data/icons/interaction-23/80/private__lock__account__user__profile-512.png" style="width:300px;height:300px;-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
     text-decoration: none; vertical-align: bottom; max-width:1200px; padding-bottom:
     0; display: inline !important; vertical-align: bottom;" width="600"></img>
                                      </a>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateBody" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff;
     border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
     100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
     color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
     line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
     padding-bottom: 9px; padding-left: 18px;' valign="top">
    
                                    <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
     sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height:
     125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
     padding: 0'><span style="text-transform:uppercase">Activate</span></h1>
    
    
                                    <h2 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
     sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height:
     125%; letter-spacing: 1px; text-align: center; display: block; margin: 0;
     padding: 0'><span style="text-transform:uppercase">your account</span></h2>
    
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
     0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
     100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
     color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
     line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
     padding-bottom: 9px; padding-left: 18px;' valign="top">Click on the link below to activate your account
                                    <br></br>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     min-width:100%;" width="100%">
                      <tbody class="mcnButtonBlockOuter">
                        <tr>
                          <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
     exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody class="mcnButtonBlockOuter">
                                <tr>
                                  <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
     exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     border-collapse: separate !important;border-radius: 48px;background-color:
     #02a95c;">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
     exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px;
     padding-right:48px; padding-bottom:24px; padding-left:48px;" valign="middle">
                                            <a class="mcnButton " href="http://localhost:3002/activate-account" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block; color: #f57153;
     font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
     1px;line-height: 100%;text-align: center;text-decoration: none;color:
     #FFFFFF; text-transform:uppercase;" target="_blank" title="Review Lingo kit
     invitation">Account activation</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
     100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
     padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
               <td>
               <table align="center" border="0" cellpadding="12" style="border-collapse:
               collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust:
               100%; -webkit-text-size-adjust: 100%; ">
                                        <tbody>
                                          <tr>
                                            <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
               -webkit-text-size-adjust: 100%">
                                              <a  style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
               -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">
                                                <img alt="twitter" height="32" src="https://static.lingoapp.com/assets/images/email/twitter-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration:
               none" width="32" />
                                              </a>
                                            </td>
                                            <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
               -webkit-text-size-adjust: 100%">
                                              <a  style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
               -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration:
               none" target="_blank">
                                                <img alt="Instagram" height="32" src="https://static.lingoapp.com/assets/images/email/instagram-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
               text-decoration: none" width="32" />
                                              </a>
                                            </td>
                                            <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
               -webkit-text-size-adjust: 100%">
                                              <a  style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
               -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">
                                                <img alt="medium" height="32" src="https://static.lingoapp.com/assets/images/email/medium-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration: none" width="32" />
                                              </a>
                                            </td>
                                            <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
               -webkit-text-size-adjust: 100%">
                                              <a  style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
               -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">
                                                <img alt="facebook" height="32" src="https://static.lingoapp.com/assets/images/email/facebook-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
               text-decoration: none" width="32" />
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
               </td>
                     
                </tr>
              </table>
              <!--[if gte mso 9]>
                      </td>
                    </tr>
                  </table>
                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </table>
      </center>
    </body>
    
    </html>
        
        
        
        
    </html>
    `});

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
      'supersecret_dont_share'
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return { message: error.message, code: error.code };
  }

  res.json({


    userId: existingUser._id, Email: existingUser.Email, UserName: existingUser.UserName, FirstName: existingUser.FirstName, LastName: existingUser.LastName, Role: existingUser.Role,

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

/*Function Update Admin */
async function updateAdmin(req, id, res) {
  const {
    UserName,
    FirstName,
    LastName,
    Email,
    Phone
  } = req.body;

  if (req.files[0]) {
    console.log('files')
    return await User.findByIdAndUpdate({ _id: id.toString() }, {
      UserName,
      FirstName,
      LastName,
      Email,
      Phone,
      ImageProfile: req.files[0].filename
    })
      .then(data => res.json({
        userId: id, Email: data.Email, UserName: data.UserName, FirstName: data.FirstName, LastName: data.LastName, Role: data.Role,
        ImageProfile: data.ImageProfile, Phone: data.Phone
      })) /* mongoose find methode always return promise  */
      .catch(err => console.log(err));
  }

  else {
    return await User.findByIdAndUpdate({ _id: id.toString() }, {
      UserName,
      FirstName,
      LastName,
      Email,
      Phone
    })
      .then(data => res.json({
        userId: id, Email: data.Email, UserName: data.UserName, FirstName: data.FirstName, LastName: data.LastName, Role: data.Role,
        ImageProfile: data.ImageProfile, Phone: data.Phone
      })) /* mongoose find methode always return promise  */
      .catch(err => console.log(err));
  }

}

/*Function Update Admin image Profile */
async function updateAdminImgP(req, id, res) {
  const {
    ImageProfile,
  } = req.body;

  if (req.files) {
    if (req.files.length == 1) {
      return User.findByIdAndUpdate({ _id: id.toString() }, {
        ImageProfile: req.files[0].filename
      })
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));
    }
  }
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


  if (req.files.length !== 0) {
    if (req.files.length === 2) {

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
}/************Update SimpleUser */


async function updateSimpleUser(req, id, res) {
  const { UserName,
    FirstName,
    LastName,
    Email,
    Phone,
    ImageProfile,
  } = req.body;
  console.log(req.files)
  if (req.files.length !== 0) {
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
  if (req.files.length !== 0) {
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


/********* Update Email*/

async function change_email(req, id, res) {
  console.log(req.body)
  try {
    const v = new Validator(req.body, {
      old_Email: 'required',
      new_Email: 'required',
      confirm_Email: 'required|same:new_Email'
    });

    const matched = await v.check();

    if (!matched) {
      return res.status(422).send(v.errors);
    }

    let current_user = await User.findOne({ _id: id })
    console.log(current_user.UserName)
    if (req.body.old_Email === current_user.Email) {

      console.log("email", req.body.new_Email)
      //let hashPassword = bcrypt.hashSync(req.body.new_Password, 10);
      await User.updateOne({
        _id: current_user._id
      }, {
        Email: req.body.new_Email
      });

      return res.status(200).send({
        message: 'Email successfully updated',

        data: current_user,
      });

    } else {
      return res.status(400).send({
        message: 'Old Email does not matched',
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
      User.findOne({ Email: email }).exec((err, user) => {
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

  const { userID, accessToken, name, emailAdresse } = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
  fetch(urlGraphFacebook, {
    method: 'GET'
  })
    .then(res => {
      const { email } = res;
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
              FirstName: name.substring(0, name.indexOf(" ") + 1),
              LastName: name.substring(name.indexOf(" ") + 1, name.length),
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

