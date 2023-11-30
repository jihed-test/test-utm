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
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  
const FindAllProfiles = async (req ,res)=>{
    var dataUser=[];
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    try {

       const data =  await ProfileModel.paginate({}, { offset, limit })
       .then(async(data) => {
        console.log("data")
        console.log(data)
        for (let index = 0; index < data.docs.length; index++) {
            const user = data.docs[index];
            const data1 =  await ProfileModel.findOne({_id: user._id}).populate('user', ["nom","prenom", "email", "role"])
            dataUser.push(data1);
        }
        // console.log("dataUser")
        // console.log(dataUser)
         res.send({
           totalItems: data.totalDocs,
           profiles: dataUser,
           totalPages: data.totalPages,
           currentPage: data.page - 1,
         });
       })
       .catch((err) => {
        res.status(404).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
}catch (error) {
    res.status(404).json(error.message)
}
}
const FindAllProfiles1 = async (req ,res)=>{
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
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
      <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      
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
          <div dir="ltr" class="es-wrapper-color">
              <!--[if gte mso 9]>
                  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                      <v:fill type="tile" color="#ffffff"></v:fill>
                  </v:background>
              <![endif]-->
              <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                  <tbody>
                      <tr>
                          <td class="esd-email-paddings" valign="top">
                              <table cellpadding="0" cellspacing="0" class="esd-header-popover es-header" align="center">
                                  <tbody>
                                      <tr>
                                          <td class="esd-stripe" align="center" style="background-color: #ffffff;" bgcolor="#ffffff">
                                              <table class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;">
                                                  <tbody>
                                                      <tr>
                                                          <td class="esd-structure es-p20 es-m-p0b" align="left">
                                                              <table cellpadding="0" cellspacing="0" width="100%">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                              <table cellpadding="0" cellspacing="0" width="100%">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_e785d3457dcd1a99a4d93d1201b618d7a74e77f67f0bd3dcba2b7f1558a3e718/images/pngegg_1.png" alt="Logo" style="display: block;" width="100" title="Logo"></a></td>
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
                                                          <td class="esd-structure es-p20r es-p20l es-m-p20b" align="left">
                                                              <table cellpadding="0" cellspacing="0" width="100%">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                              <table cellpadding="0" cellspacing="0" width="100%">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td align="center" class="esd-block-spacer es-p10t es-p10b" style="font-size:0">
                                                                                              <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                                                                  <tbody>
                                                                                                      <tr>
                                                                                                          <td style="border-bottom: 1px solid #6ec9f1; background: none; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                      </tr>
                                                                                                  </tbody>
                                                                                              </table>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td align="left" class="esd-block-text es-p20t es-p5b es-m-txt-l">
                                                                                              <h2 style="line-height: 120%;">Good day!</h2>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td align="left" class="esd-block-text es-p10t es-p10b es-m-txt-l">
                                                                                              <p>Dear [Recipient's Name],</p>
                                                                                              <p>I hope this email finds you well. I am writing to inform you that I have taken the necessary steps to assist you in recovering your account password. In order to facilitate the process, I have sent the password to your designated email address. This will enable you to access your account and regain control over it.</p>
                                                                                              <p>Email : [Recipient's Name]</p>
                                                                                              <p>Password: [Recipient's Name]</p>
                                                                                              <p>I sincerely apologize for any inconvenience this may have caused you and I understand the importance of maintaining the security of your account. Therefore, I have implemented strict measures to ensure the confidentiality and integrity of your personal information throughout this recovery procedure.</p>
                                                                                              <p>Should you encounter any difficulties or require further assistance, please do not hesitate to contact our dedicated support team. They will be more than happy to provide you with the necessary guidance and support to ensure a seamless account recovery experience.</p>
                                                                                              <p>We value your trust and remain committed to providing you with the highest level of service.</p>
                                                                                              <p>Thank you for choosing our services and for giving us the opportunity to assist you. We look forward to serving you in the future.</p>
                                                                                              <p>Warm regards,</p>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td align="center" class="esd-block-button es-p10t es-p10b es-m-p40b es-m-txt-c">
                                                                                              <!--[if mso]><a href="http://vps-4eab7525.vps.ovh.net/dashboard/app" target="_blank" hidden>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="http://vps-4eab7525.vps.ovh.net/dashboard/app" 
                      style="height:50px; v-text-anchor:middle; width:180px" arcsize="50%" stroke="f"  fillcolor="#6ec9f1">
              <w:anchorlock></w:anchorlock>
              <center style='color:#ffffff; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:18px; font-weight:400; line-height:18px;  mso-text-raise:1px'>Learn more</center>
          </v:roundrect></a>
      <![endif]-->
                                                                                              <!--[if !mso]><!-- --><span class="msohide es-button-border-1614696552493 es-button-border" style="background: #6ec9f1;"><a href="http://vps-4eab7525.vps.ovh.net/dashboard/app" class="es-button es-button-1614696552480" target="_blank" style="background: #6ec9f1; mso-border-alt: 10px solid  #6ec9f1; padding: 10px 20px 10px 10px"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/65391614697135358.png" alt="icon" width="30" class="esd-icon-left" style="margin-right:10px;" align="absmiddle">Learn more</a></span>
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
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                              <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                                  <tbody>
                                      <tr>
                                          <td class="esd-stripe" align="center">
                                              <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                                  <tbody>
                                                      <tr>
                                                          <td class="esd-structure es-p20" align="left">
                                                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="218" valign="top"><![endif]-->
                                                              <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td width="218" class="esd-container-frame es-m-p20b" align="center" valign="top">
                                                                              <table cellpadding="0" cellspacing="0" width="100%" style="border-right:1px solid #6ec9f1;">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td align="center" class="esd-block-image es-p20t es-p20b es-p20r es-m-p0t es-m-p10l es-m-txt-c" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_e785d3457dcd1a99a4d93d1201b618d7a74e77f67f0bd3dcba2b7f1558a3e718/images/pngegg_1.png" alt="Jada Nelson" style="display: block;" width="197" title="Jada Nelson"></a></td>
                                                                                      </tr>
                                                                                  </tbody>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                              <!--[if mso]></td><td width="20"></td><td width="322" valign="top"><![endif]-->
                                                              <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td width="322" align="left" class="esd-container-frame">
                                                                              <table cellpadding="0" cellspacing="0" width="100%">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td align="left" class="esd-block-image es-p5t es-p5b es-m-p0" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img class="adapt-img" src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/42581614947368048.png" alt style="display: block;" width="262"></a></td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td align="left" class="esd-block-text es-m-txt-l">
                                                                                              <h3><strong>JridiJihed</strong>&nbsp;&nbsp;Dev</h3>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td class="esd-block-menu" esd-tmp-menu-size="width|20" esd-tmp-menu-padding="10|5">
                                                                                              <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                                  <tbody>
                                                                                                      <tr class="links-images-left">
                                                                                                          <td align="left" valign="top" width="50%" class="es-p10t es-p10b" style="padding-top: 10px; padding-bottom: 5px;"><a target="_blank" href="tel:+134578990"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/95711614763048218.png" alt="+216 55 228 226" title="+216 55 228 226" align="absmiddle" class="es-p5r" width="20">+216 55 228 226</a></td>
                                                                                                          <td align="left" valign="top" width="50%" class="es-p10t es-p10b" style="padding-top: 10px; padding-bottom: 5px;"><a target="_blank" href="tel:+134578990"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/69541614947093393.png" alt="+216 228 226" title="+216 228 226" align="absmiddle" class="es-p5r" width="20">+216 228 226</a></td>
                                                                                                      </tr>
                                                                                                  </tbody>
                                                                                              </table>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td class="esd-block-menu" esd-tmp-menu-size="width|20" esd-tmp-menu-padding="5|10">
                                                                                              <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                                  <tbody>
                                                                                                      <tr class="links-images-left">
                                                                                                          <td align="left" valign="top" width="50%" class="es-p10t es-p10b" style="padding-top: 5px; padding-bottom: 10px;"><a target="_blank" href="mailto:jada@insurance.agency"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/58641614773761370.png" alt="Mail me" title="Mail me" align="absmiddle" class="es-p5r" width="20">Mail me</a></td>
                                                                                                          <td align="left" valign="top" width="50%" class="es-p10t es-p10b" style="padding-top: 5px; padding-bottom: 10px;"><a target="_blank" href="https://viewstripo.email"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/60191614948456055.png" alt="ROMMANA 1068 Tunis, Tunisie" title="ROMMANA 1068 Tunis, Tunisie" align="absmiddle" class="es-p5r" width="20">ROMMANA 1068 Tunis, Tunisie</a></td>
                                                                                                      </tr>
                                                                                                  </tbody>
                                                                                              </table>
                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                          <td align="left" class="esd-block-social es-p5t es-p5b" style="font-size:0">
                                                                                              <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                                  <tbody>
                                                                                                      <tr>
                                                                                                          <td align="center" valign="top" class="es-p20r"><a target="_blank" href="https://viewstripo.email"><img title="Facebook" src="https://fbeioii.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="24" height="24"></a></td>
                                                                                                          <td align="center" valign="top" esd-tmp-icon-type="slack" class="es-p20r"><a target="_blank" href="https://viewstripo.email"><img title="Slack" src="https://fbeioii.stripocdn.email/content/assets/img/messenger-icons/logo-black/slack-logo-black.png" alt="Slack" width="24" height="24"></a></td>
                                                                                                          <td align="center" valign="top" esd-tmp-icon-type="telegram" class="es-p20r"><a target="_blank" href="https://viewstripo.email"><img title="Telegram" src="https://fbeioii.stripocdn.email/content/assets/img/messenger-icons/logo-black/telegram-logo-black.png" alt="Telegram" width="24" height="24"></a></td>
                                                                                                          <td align="center" valign="top" esd-tmp-icon-type="skype"><a target="_blank" href="skype:"><img title="Skype" src="https://fbeioii.stripocdn.email/content/assets/img/messenger-icons/logo-black/skype-logo-black.png" alt="Skype" width="24" height="24"></a></td>
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
                                                              <!--[if mso]></td></tr></table><![endif]-->
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                              <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                  <tbody>
                                      <tr>
                                          <td class="esd-stripe" align="center">
                                              <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                  <tbody>
                                                      <tr>
                                                          <td class="esd-structure es-p20" align="left">
                                                              <table cellpadding="0" cellspacing="0" width="100%">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                              <table cellpadding="0" cellspacing="0" width="100%">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td align="center" class="esd-block-text es-infoblock">
                                                                                              <p style="line-height: 150%;">You are receiving this email because you have visited our site or asked us about the regular newsletter. Make sure our messages get to your Inbox (and not your bulk or junk folders).<br><a target="_blank" style="line-height: 150%;" href="https://viewstripo.email">Privacy police</a> | <a target="_blank" style="line-height: 150%;">Unsubscribe</a></p>
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
      </html>`,
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