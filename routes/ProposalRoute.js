


var express = require('express');
var router = express.Router();
const Proposal = require('../models/Proposal');
const User = require('../models/User');
const sendEmail = require("../util/sendEmail");

const Conversation = require("../models/Conversation");
const checkAuth = require('../middleware/check-auth');

router.use(checkAuth)

//crud proposal
router.get('/', (req, res) => {
    Proposal.find()
        .then(proposals => res.json(proposals))
        .catch(err => res.status(404).json({ notfound: 'No proposals found' }));
}
);
router.post('/', async (req, res) => {
    const newProposal = new Proposal(
        req.body);
    const creator = await User.findOne({ _id: req.body.ownerId.toString() })
    console.log(creator)
    newProposal.save()
        .then(async (proposal) => {
            console.log(proposal)
            await sendEmail({
                email: creator.Email, subject: proposal.object, html: `

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
                                              <a class="" href="https://www.lingoapp.com/" style="mso-line-height-rule:
             exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
             #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                                <img align="center" alt="Forgot your password?" class="mcnImage" src="https://cdni.iconscout.com/illustration/premium/thumb/investment-growth-2952454-2462945.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
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
             padding: 0'><span style="text-transform:uppercase">Investment Proposal</span></h1>
            
            
                                            <h2 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
             sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height:
             125%; letter-spacing: 1px; text-align: center; display: block; margin: 0;
             padding: 0'><span style="text-transform:uppercase"></span></h2>
            
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
             padding-bottom: 9px; padding-left: 18px;' valign="top">${proposal.body}
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
                                                    <a class="mcnButton " href="http://localhost:3002/listproposal/${proposal.ownerId}" style="mso-line-height-rule: exactly;
             -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block; color: #f57153;
             font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
             1px;line-height: 100%;text-align: center;text-decoration: none;color:
             #FFFFFF; text-transform:uppercase;" target="_blank" title="Review Lingo kit
             invitation">Check investment proposal</a>
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
                                                      <a href="https://twitter.com/@lingo_app" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                       -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">
                                                        <img alt="twitter" height="32" src="https://static.lingoapp.com/assets/images/email/twitter-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration:
                       none" width="32" />
                                                      </a>
                                                    </td>
                                                    <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                       -webkit-text-size-adjust: 100%">
                                                      <a href="https://www.instagram.com/lingo_app/" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                       -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration:
                       none" target="_blank">
                                                        <img alt="Instagram" height="32" src="https://static.lingoapp.com/assets/images/email/instagram-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
                       text-decoration: none" width="32" />
                                                      </a>
                                                    </td>
                                                    <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                       -webkit-text-size-adjust: 100%">
                                                      <a href="https://medium.com/@lingo_app" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                       -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">
                                                        <img alt="medium" height="32" src="https://static.lingoapp.com/assets/images/email/medium-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration: none" width="32" />
                                                      </a>
                                                    </td>
                                                    <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                       -webkit-text-size-adjust: 100%">
                                                      <a href="https://www.facebook.com/Lingoapp/" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
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
    res.json(proposal)
})
    .catch(err => res.status(400).json({ error: err }));
}
);
router.get('/getallproposalbystate', function (req, res, next) {
    Proposal.aggregate([
        {
            $group: {
                _id: '$state',
                count: { $sum: 1 }
            }
        }
    ]).then(data => res.json(data))
});
router.get('/:id', (req, res) => {
    Proposal.findById(req.params.id)
        .then(proposal => res.json(proposal))
        .catch(err => res.status(404).json({ notfound: 'No proposal found' }));
}
);

router.get('/owner/:id', (req, res) => {
    Proposal.find({ ownerId: req.params.id })
        .then(proposal => res.json(proposal))
        .catch(err => res.status(404).json({ notfound: 'No proposal found' }));
}
);
router.get('/getByInvestorandProject/:idProject/:idInvestor', (req, res) => {
    Proposal.findOne({ projectId: req.params.idProject, investorId: req.params.idInvestor })
        .then(proposal => res.json(proposal))
        .catch(err => res.status(404).json({ notfound: 'No proposal found' }));
}
);

router.put('/approve/:id', (req, res) => {
    Proposal.findByIdAndUpdate(req.params.id, { state: "Approved" })
        .then(proposal => {
            res.json(proposal);
        })
        .catch(err => res.status(404).json({ notfound: 'No proposal found' }));
}   //update proposal
);
router.put('/accept/:id', (req, res) => {
    Proposal.findByIdAndUpdate(req.params.id, { state: "Accepted" })
        .then(proposal => {
            res.json(proposal);
            let newConversation = new Conversation({
                members: [proposal.investorId, proposal.ownerId],
            });

            try {
                const savedConversation = newConversation.save();

            } catch (err) {
                console.log(err)
            }
        })
        .catch(err => res.status(404).json({ notfound: 'No proposal found' }));
}   //update proposal
);
router.put('/reject/:id', (req, res) => {
    Proposal.findByIdAndUpdate(req.params.id, { state: "Rejected" })
        .then(proposal => res.json(proposal))
        .catch(err => res.status(404).json({ notfound: 'No proposal found' }));
}   //update proposal
);
router.delete('/:idProject/:idInvestor', (req, res) => {   //delete proposal
    const poposal = Proposal.findOneAndDelete({ projectId: req.params.idProject, investorId: req.params.idInvestor })
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ notfound: 'No proposal found' }));
}
);
module.exports = router;