const nodemailer = require('nodemailer');
const ProfileModel = require('../models/profiles.models')
const ValidateProfile = require("../validation/Profile")
// var htmlstream = fs.createReadStream("test.html");

// Configure Nodemailer with your SMTP settings
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jihed.jridi@utm.tn',
      pass: 'feqtplxciztlayms',
    },
  });

const AddProfile = async (req ,res)=>{
    const {errors, isValid} = ValidateProfile(req.body)
    try {
        if(!isValid){
          res.status(404).json(errors)
        }else{
            ProfileModel.findOne({user: req.user.id})
        .then(async (profile)=>{
            if(!profile){
                req.body.user = req.user.id
                await ProfileModel.create(req.body)
                res.status(200).json({message: "success"})
            }else{
               await  ProfileModel.findOneAndUpdate(
                    {_id: profile._id},
                    req.body,
                    {new: true}
                ).then(result=>{
                    res.status(200).json(result)
                })
            }
        })
        }
    } catch (error) {
         res.status(404).json(error.message)
    }
}

const FindAllProfiles = async (req ,res)=>{
    try {
       const data =  await ProfileModel.find().populate('user', ["nom","prenom", "email", "role"])
       res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}

const FindSingleProfile = async (req ,res)=>{
    try {
        const data =  await ProfileModel.findOne({user: req.user.id}).populate('user', ["nom", "email", "role","image"])
        res.status(200).json(data)
        
        

     } catch (error) {
         res.status(404).json(error.message)

     }
}

const DeleteProfile = async (req ,res)=>{
    try {
        const data =  await ProfileModel.findOneAndRemove({_id: req.params.id})
        res.status(200).json({message: "deleted"})
     } catch (error) {
         res.status(404).json(error.message)
     }
}

const SendMail =  (req, res) => {
    const mailOptions = {
      from: 'jihed.jridi@utm.tn',
      to: 'djeridijihed290@gmail.com',
      subject: 'Subject of your email test ',
      text: 'Content of your email',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
          <meta charset="UTF-8">
          <meta content="width=device-width, initial-scale=1" name="viewport">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta content="telephone=no" name="format-detection">
          <title></title>
          <!--[if (mso 16)]>
          <style type="text/css">
          a {text-decoration: none;}
          </style>
          <![endif]-->
          <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
          <!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      </head>
      
      <body>
          <div class="es-wrapper-color">
              <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#333333"></v:fill>
            </v:background>
          <![endif]-->
              <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                  <tbody>
                      <tr>
                          <td class="esd-email-paddings" valign="top">
                              <table cellpadding="0" cellspacing="0" class="es-header esd-header-popover" align="center">
                                  <tbody>
                                      <tr>
                                          <td class="esd-stripe" align="center">
                                              <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#2b2c2c" align="center">
                                                  <tbody>
                                                      <tr>
                                                          <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                              <table width="100%" cellspacing="0" cellpadding="0">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                              <table width="100%" cellspacing="0" cellpadding="0">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td class="esd-block-text" align="left">
                                                                                              <h2>Verification Code</h2>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td class="esd-block-spacer es-p5t" align="left">
                                                                                              <table width="5%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                  <tbody>
                                                                                                      <tr>
                                                                                                          <td style="border-bottom: 3px solid #de4a4a; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
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
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                              <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                                  <tbody>
                                      <tr>
                                          <td class="esd-stripe esd-checked" align="center">
                                              <table class="es-content-body hide-bg" style="background-image:url(https://fbeioii.stripocdn.email/content/guids/CABINET_8cd399d86e34002dbfc2366e203785dd/images/74101540392347022.png);background-color: #212121; background-position: center top; background-repeat: no-repeat;" width="600" cellspacing="0" cellpadding="0" bgcolor="#212121" align="center">
                                                  <tbody>
                                                      <tr>
                                                          <td class="esd-structure es-p20t es-p10b es-p25r es-p25l" align="left">
                                                              <!--[if mso]><table width="550" cellpadding="0" 
                              cellspacing="0"><tr><td width="394" valign="top"><![endif]-->
                                                              <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td class="esd-container-frame" width="394" align="left">
                                                                              <table style="background-position: center top;" width="100%" cellspacing="0" cellpadding="0">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td class="esd-block-image" align="left" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img class="adapt-img" src="https://fbeioii.stripocdn.email/content/guids/CABINET_07bf7c6e64d897719470f45365cca3e8437ef2d10af53c848d427dd2b83a362f/images/title2.png" alt="Our employees" title="Our employees" style="display: block;" width="104"></a></td>
                                                                                      </tr>
                                                                                  </tbody>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                              <!--[if mso]></td><td width="20"></td><td width="136" valign="top"><![endif]-->
                                                              <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td class="esd-container-frame" width="136" align="left">
                                                                              <table style="background-position: center top;" width="100%" cellspacing="0" cellpadding="0">
                                                                                  <tbody>
                                                                                      <tr class="es-mobile-hidden">
                                                                                          <td class="esd-block-text es-p10b" align="left">
                                                                                              <h1 style="color: #dbdbdb; font-size: 40px;"><br></h1>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td class="esd-block-text es-m-txt-c es-p20t" align="left">
                                                                                              <h1 class="fadeInItem" style="color: #dbdbdb; font-size: 19px;">Verification Code</h1>
                                                                                          </td>
                                                                                      </tr>
                                                                                  </tbody>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                              <!--[if mso]></td></tr></table><![endif]-->
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td class="esd-structure es-p25r es-p25l" style="background-position: center top;" align="left">
                                                              <table width="100%" cellspacing="0" cellpadding="0">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td class="esd-container-frame" width="550" valign="top" align="center">
                                                                              <table width="100%" cellspacing="0" cellpadding="0">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td class="esd-block-spacer es-p5t es-p5b" align="center" style="font-size:0">
                                                                                              <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                  <tbody>
                                                                                                      <tr>
                                                                                                          <td style="border-bottom: 3px solid #de4a4a; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
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
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td class="esd-structure es-p25t es-p30r es-p30l" style="background-position: center top;" align="left">
                                                              <!--[if mso]><table width="540" cellpadding="0" 
                              cellspacing="0"><tr><td width="240" valign="top"><![endif]-->
                                                              <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td class="es-m-p20b esd-container-frame" width="240" align="left">
                                                                              <table width="100%" cellspacing="0" cellpadding="0">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td class="esd-block-text es-p5t es-p10b es-p15r es-p15l" align="right">
                                                                                              <h2 style="line-height: 120%;">Verification Code</h2>
                                                                                              <h2 style="line-height: 120%; color: #de4a4a;"><strong>HGASNC18</strong></h2>
                                                                                          </td>
                                                                                      </tr>
                                                                                  </tbody>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                              <!--[if mso]></td><td width="20"></td><td width="280" valign="top"><![endif]-->
                                                              <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td class="esd-container-frame" width="280" align="left">
                                                                              <table style="border-color: #dbdbdb; border-style: dashed; border-width: 2px; background-position: center top;" width="100%" cellspacing="0" cellpadding="0">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td class="esd-block-timer es-p15t es-p20b es-p10r es-p10l" align="center" esdev-config="h1"><a target="_blank"><img alt class="adapt-img" src="https://cdt-timer.stripocdn.email/api/v1/images/-RFdHpVfrIxg802QakVAYqMFOe9K6O-9O8hVOMqiC-I?time=1696854135931" width="256"></a></td>
                                                                                      </tr>
                                                                                  </tbody>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                              <!--[if mso]></td></tr></table><![endif]-->
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td class="esd-structure es-p20t es-p20b es-p40r es-p40l" align="left">
                                                              <table width="100%" cellspacing="0" cellpadding="0">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td class="es-m-p20b esd-container-frame" width="520" align="left">
                                                                              <table width="100%" cellspacing="0" cellpadding="0">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td class="esd-block-text es-m-txt-c es-p15t" align="center">
                                                                                              <h2 style="color: #dbdbdb;">Dear:</h2>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td class="esd-block-text es-m-txt-c es-p15t" align="center">
                                                                                              <p style="color: #dbdbdb; font-size: 16px;"><br></p>
                                                                                              <p style="color: #dbdbdb; font-size: 16px;">Please enter the code 515071 to verify your account.</p>
                                                                                              <p style="color: #dbdbdb; font-size: 16px;"><b>Note:</b><br>After your account is verified, you can modify your password, login email address, and cell phone number. If you did not request a verification code, please change your account password to prevent unauthorized access to your account.</p>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td class="esd-block-button es-p20t es-p10r es-p10l" align="center">
                                                                                              <!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
                      style="height:39px; v-text-anchor:middle; width:184px" arcsize="0%" strokecolor="#de4a4a" strokeweight="2px" fillcolor="#212121">
          <w:anchorlock></w:anchorlock>
          <center style='color:#de4a4a; font-family:arial, "helvetica neue", helvetica, "sans-serif"; font-size:14px; font-weight:400; line-height:14px;  mso-text-raise:1px'>VERIFY NOW</center>
        </v:roundrect></a>
      <![endif]-->
                                                                                              <!--[if !mso]><!-- --><span class="msohide es-button-border" style="background: #212121 none repeat scroll 0% 0%;"><a href="https://viewstripo.email" class="es-button" target="_blank" style="background: #212121 none repeat scroll 0% 0%; mso-border-alt: 10px solid  #212121">VERIFY NOW</a></span>
                                                                                              <!--<![endif]-->
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
                                                          <td class="esd-structure es-p10b es-p20r es-p20l" style="background-position: center top;" align="left">
                                                              <table width="100%" cellspacing="0" cellpadding="0">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                              <table style="background-position: center top;" width="100%" cellspacing="0" cellpadding="0">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td class="esd-block-image" align="center" style="font-size:0"><a target="_blank"><img class="adapt-img" src="https://fbeioii.stripocdn.email/content/guids/CABINET_8cd399d86e34002dbfc2366e203785dd/images/14991540389761621.png" alt style="display: block;" width="560"></a></td>
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
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                              <table cellpadding="0" cellspacing="0" class="es-footer esd-footer-popover" align="center">
                                  <tbody>
                                      <tr>
                                          <td class="esd-stripe" align="center">
                                              <table class="es-footer-body" style="background-color: #212121;" width="600" cellspacing="0" cellpadding="0" bgcolor="#212121" align="center">
                                                  <tbody>
                                                      <tr>
                                                          <td class="esd-structure es-p20t es-p30b es-p20r es-p20l" align="left">
                                                              <table width="100%" cellspacing="0" cellpadding="0">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                              <table width="100%" cellspacing="0" cellpadding="0">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td class="esd-block-social es-p15b" align="center" style="font-size:0">
                                                                                              <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0">
                                                                                                  <tbody>
                                                                                                      <tr>
                                                                                                          <td class="es-p20r" valign="top" align="center"><a target="_blank" href="https://"><img title="Facebook" src="https://fbeioii.stripocdn.email/content/assets/img/social-icons/logo-gray/facebook-logo-gray.png" alt="Fb" width="32"></a></td>
                                                                                                          <td class="es-p20r" valign="top" align="center"><a target="_blank" href="https://"><img title="Twitter" src="https://fbeioii.stripocdn.email/content/assets/img/social-icons/logo-gray/twitter-logo-gray.png" alt="Tw" width="32"></a></td>
                                                                                                          <td class="es-p20r" valign="top" align="center"><a target="_blank" href="https://"><img title="Instagram" src="https://fbeioii.stripocdn.email/content/assets/img/social-icons/logo-gray/instagram-logo-gray.png" alt="Inst" width="32"></a></td>
                                                                                                          <td class="es-p10r" valign="top" align="center"><a target="_blank" href="https://"><img title="Youtube" src="https://fbeioii.stripocdn.email/content/assets/img/social-icons/logo-gray/youtube-logo-gray.png" alt="Yt" width="32"></a></td>
                                                                                                      </tr>
                                                                                                  </tbody>
                                                                                              </table>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td align="center" class="esd-block-text">
                                                                                              <p style="font-size: 13px;">Campus Universitaire Farhat Hached B.P. n° 94 - ROMMANA 1068 Tunis, Tunisie.<br></p>
                                                                                              <p style="font-size: 13px;">&nbsp;CCP : 17001000000321990621. Tél : (216) 71 873 366<br></p>
                                                                                              <p style="font-size: 13px;"><a target="_blank" style="font-size: 13px;" class="unsubscribe" href>Unsubscribe</a> | <a target="_blank" style="font-size: 13px;" href="https://viewstripo.email">Update Preferences</a></p>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td class="esd-block-text es-p5t" align="center">
                                                                                              <p style="font-size: 13px;">You are receiving this email because you have visited our site or asked us about regular newsletter. Make sure our messages get to your Inbox (and not your bulk or junk folders).</p>
                                                                                              <p style="font-size: 13px;">Vectors graphics designed by Reevateam.</p>
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
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </body>
      
      </html>
      `,
    }; 
  
     transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
      }
    });
  }
  const SendMailPdf =  (req, res) => {
    const mailOptions = {
      from: 'jihed.jridi@utm.tn',
      to: 'djeridijihed290@gmail.com',
      subject: 'Subject of your email test ',
      text: 'Content of your email1',
      
    };
  
     transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
      }
    });
  }
module.exports = {
    AddProfile,
    FindAllProfiles,
    FindSingleProfile,
    DeleteProfile,
    SendMail,
    SendMailPdf
}