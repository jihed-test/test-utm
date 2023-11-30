const EventModel = require('../models/event.models')
const EventlistModels = require("../models/eventlist.models");
const ValidateEvent = require("../validation/Event")
const UserModel = require("../models/users.models");
var fs = require('fs');
const { jsPDF } = require("jspdf");
const nodemailer = require('nodemailer');
// Configure Nodemailer with your SMTP settings

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'jihed.jridi@utm.tn',
        pass: 'feqtplxciztlayms',
    },
});
const pdfMaker = (event,user) => {
    // var doc = new jsPDF({
    //   orientation: 'landscape',
    //   unit: 'px',
    //   format: [300, 250]
    // })
    var doc = new jsPDF("p", "mm", "a4");
    // const imgData = 'utm-mesrs.png';
    var imgData = fs.readFileSync('utm-mesrs.png').toString('base64');    
     doc.addImage(imgData, 'PNG', 0, 0, 216, 96);
    doc.text(20, 90, 'Événement:');
    doc.text(event.title, 20, 100, { maxWidth: 180 });
    const length = Math.ceil(event.title.length / 69);
    doc.line(20, 93 + (length * 10), 150, 93 + (length * 10), 'DF')
    doc.text(20, 100 + (length * 10), `* Nom : ${user.nom}`);
    doc.text(20, 110 + (length * 10), `* Prénom : ${user.prenom}`);
    doc.text(20, 120 + (length * 10), `* Email : ${user.email}`);

    doc.setProperties({
        title: 'Title',
        subject: 'This is the subject',
        author: 'James Hall',
        keywords: 'generated, javascript, web 2.0, ajax',
        creator: 'MEEE'
    });
    doc.save('./File/Test.pdf');
    return doc;

}
const AddEvent = async (req, res) => {
    const { errors, isValid } = ValidateEvent(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {


            EventModel.findOne({ user: req.user.id, title: req.body.title })
                .then(async (event) => {
                    if (!event) {
                        req.body.user = req.user.id
                        req.body.comment = "";
                        req.body.participation = false ;
                        req.body.j1 = false ;
                        req.body.j2 = false ;
                        req.body.j3 = false ;
                        req.body.j4 = false ;
                        req.body.j5 = false ;
                        req.body.j6 = false ;
                        req.body.j7 = false ;
                        await EventModel.create(req.body)
                        EventlistModels.findOne({ title: req.body.title })
                        .then(async(eventList) => {
                            eventList.participation=eventList.participation+1;
                            await EventlistModels.findOneAndUpdate(
                                { _id: eventList._id},
                                eventList,
                                { new: true }
                            )  
                        })
                        EventModel.findOne({ user: req.user.id, title: req.body.title })
                            .then((event) => {
                                event = {
                                    ...event._doc,
                                    message: "success"
                                }
                                console.log("event")
                                console.log(event)
                                // *****************************
                                UserModel.findOne({ _id: event.user }).then((user) => {
                                var doc = pdfMaker(event,user);
                                
                                const mailOptions = {
                                    from: 'jihed.jridi@utm.tn',
                                    to: 'djeridijihed290@gmail.com',
                                    subject: 'Event Invitation ',
                                    text: 'Content of your email',
                                    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                                    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
                                     <head>
                                      <meta charset="UTF-8">
                                      <meta content="width=device-width, initial-scale=1" name="viewport">
                                      <meta name="x-apple-disable-message-reformatting">
                                      <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                      <meta content="telephone=no" name="format-detection">
                                      <title>New message 2</title><!--[if (mso 16)]>
                                        <style type="text/css">
                                        a {text-decoration: none;}
                                        </style>
                                        <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
                                    <xml>
                                        <o:OfficeDocumentSettings>
                                        <o:AllowPNG></o:AllowPNG>
                                        <o:PixelsPerInch>96</o:PixelsPerInch>
                                        </o:OfficeDocumentSettings>
                                    </xml>
                                    <![endif]-->
                                      <style type="text/css">
                                    .section-title {
                                        padding:5px 10px;
                                        background-color:#f6f6f6;
                                        border:1px solid #dfdfdf;
                                        outline:0;
                                    }
                                    #outlook a {
                                        padding:0;
                                    }
                                    .es-button {
                                        mso-style-priority:100!important;
                                        text-decoration:none!important;
                                    }
                                    a[x-apple-data-detectors] {
                                        color:inherit!important;
                                        text-decoration:none!important;
                                        font-size:inherit!important;
                                        font-family:inherit!important;
                                        font-weight:inherit!important;
                                        line-height:inherit!important;
                                    }
                                    .es-desk-hidden {
                                        display:none;
                                        float:left;
                                        overflow:hidden;
                                        width:0;
                                        max-height:0;
                                        line-height:0;
                                        mso-hide:all;
                                    }
                                    .es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
                                        background:#40b8ec!important;
                                    }
                                    .es-button-border:hover {
                                        border-color:#42d159 #42d159 #42d159 #42d159!important;
                                        background:#40b8ec!important;
                                    }
                                    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } button.es-button { width:100% } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
                                    </style>
                                     </head>
                                     <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                                      <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FFFFFF"><!--[if gte mso 9]>
                                                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                                    <v:fill type="tile" color="#ffffff"></v:fill>
                                                </v:background>
                                            <![endif]-->
                                       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
                                         <tr>
                                          <td valign="top" style="padding:0;Margin:0">
                                           <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                                             <tr>
                                              <td align="center" style="padding:0;Margin:0;background-image:url(https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/39721614698061295.png);background-repeat:no-repeat;background-position:left center;background-color:#ffffff" background="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/39721614698061295.png" bgcolor="#ffffff">
                                               <table class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
                                                 <tr>
                                                  <td class="es-m-p0b" align="left" style="padding:20px;Margin:0">
                                                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                     <tr>
                                                      <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                         <tr>
                                                          <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3d5621800a364ee59bf5cd9be864f1f2d1bec61520cd6ffa065971a3d508e6b3/images/pngegg_1.png" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100" title="Logo"></a></td>
                                                         </tr>
                                                       </table></td>
                                                     </tr>
                                                   </table></td>
                                                 </tr>
                                                 <tr>
                                                  <td class="es-m-p20b" align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
                                                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                     <tr>
                                                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                         <tr>
                                                          <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0">
                                                           <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                             <tr>
                                                              <td style="padding:0;Margin:0;border-bottom:1px solid #6ec9f1;background:none;height:1px;width:100%;margin:0px"></td>
                                                             </tr>
                                                           </table></td>
                                                         </tr>
                                                         <tr>
                                                          <td align="left" class="es-m-txt-l" style="padding:0;Margin:0;padding-bottom:5px;padding-top:20px"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:24px;font-style:normal;font-weight:bold;color:#333333">Good day!</h2></td>
                                                         </tr>
                                                         <tr>
                                                          <td align="left" class="es-m-txt-l" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Dear ${user.nom} ${user.prenom},</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">We cordially extend our sincere invitation to you for the upcoming corporate event. It is with great pleasure that we request your presence at this exclusive occasion. We highly value your presence and believe that your participation would significantly contribute to the success of the event.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Kindly mark your calendar for ${event.title} [Event Date] at [Event Venue]. The event will commence at 8:30 and promises to be an enriching experience, featuring insightful discussions and networking opportunities with industry leaders.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Please do not hesitate to contact our event coordinator, [Coordinator's Name], at [Coordinator's Email/Phone].</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Thank you for considering our invitation, and we hope to have the honor of your presence at the event.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Warm regards,</p></td>
                                                         </tr>
                                                         <tr>
                                                          <td align="center" class="es-m-p40b es-m-txt-c" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><!--[if mso]><a href="http://vps-4eab7525.vps.ovh.net/dashboard/app" target="_blank" hidden>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="http://vps-4eab7525.vps.ovh.net/dashboard/app" 
                                                    style="height:50px; v-text-anchor:middle; width:180px" arcsize="50%" stroke="f"  fillcolor="#6ec9f1">
                                            <w:anchorlock></w:anchorlock>
                                            <center style='color:#ffffff; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:18px; font-weight:400; line-height:18px;  mso-text-raise:1px'>Learn more</center>
                                        </v:roundrect></a>
                                    <![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border-1614696552493 es-button-border" style="border-style:solid;border-color:#2CB543;background:#6ec9f1;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="http://vps-4eab7525.vps.ovh.net/dashboard/app" class="es-button es-button-1614696552480" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;padding:10px 20px 10px 10px;display:inline-block;background:#6ec9f1;border-radius:30px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;mso-padding-alt:0;mso-border-alt:10px solid  #6ec9f1"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/65391614697135358.png" alt="icon" width="30" style="display:inline-block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;vertical-align:middle;margin-right:10px" align="absmiddle">Learn more</a></span><!--<![endif]--></td>
                                                         </tr>
                                                       </table></td>
                                                     </tr>
                                                   </table></td>
                                                 </tr>
                                               </table></td>
                                             </tr>
                                           </table>
                                           <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                                             <tr>
                                              <td align="center" style="padding:0;Margin:0">
                                               <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center" role="none">
                                                 <tr>
                                                  <td align="left" style="padding:20px;Margin:0"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:218px" valign="top"><![endif]-->
                                                   <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                     <tr>
                                                      <td class="es-m-p20b" align="center" valign="top" style="padding:0;Margin:0;width:218px">
                                                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-right:1px solid #6ec9f1" role="presentation">
                                                         <tr>
                                                          <td align="center" class="es-m-p0t es-m-p10l es-m-txt-c" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px;padding-right:20px;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3d5621800a364ee59bf5cd9be864f1f2d1bec61520cd6ffa065971a3d508e6b3/images/pngegg_1.png" alt="Jada Nelson" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="197" title="Jada Nelson"></a></td>
                                                         </tr>
                                                       </table></td>
                                                     </tr>
                                                   </table><!--[if mso]></td><td style="width:20px"></td><td style="width:322px" valign="top"><![endif]-->
                                                   <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                     <tr>
                                                      <td align="left" style="padding:0;Margin:0;width:322px">
                                                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                         <tr>
                                                          <td align="left" class="es-m-p0" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img class="adapt-img" src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/42581614947368048.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="262"></a></td>
                                                         </tr>
                                                         <tr>
                                                          <td align="left" class="es-m-txt-l" style="padding:0;Margin:0"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333"><strong>JridiJihed</strong>&nbsp;&nbsp;Dev</h3></td>
                                                         </tr>
                                                         <tr>
                                                          <td style="padding:0;Margin:0">
                                                           <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                             <tr class="links-images-left">
                                                              <td align="left" valign="top" width="50%" style="padding:0;Margin:0;padding-top:10px;padding-bottom:5px;border:0" id="esd-menu-id-0"><a target="_blank" href="tel:+134578990" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#666666;font-size:14px"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/95711614763048218.png" alt="+216 55 228 226" title="+216 55 228 226" align="absmiddle" width="20" style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;padding-right:5px;vertical-align:middle">+216 55 228 226</a></td>
                                                              <td align="left" valign="top" width="50%" style="padding:0;Margin:0;padding-top:10px;padding-bottom:5px;border:0" id="esd-menu-id-1"><a target="_blank" href="tel:+134578990" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#666666;font-size:14px"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/69541614947093393.png" alt="+216 228 226" title="+216 228 226" align="absmiddle" width="20" style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;padding-right:5px;vertical-align:middle">+216 228 226</a></td>
                                                             </tr>
                                                           </table></td>
                                                         </tr>
                                                         <tr>
                                                          <td style="padding:0;Margin:0">
                                                           <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                             <tr class="links-images-left">
                                                              <td align="left" valign="top" width="50%" style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px;border:0" id="esd-menu-id-0"><a target="_blank" href="mailto:jada@insurance.agency" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#666666;font-size:14px"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/58641614773761370.png" alt="Mail me" title="Mail me" align="absmiddle" width="20" style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;padding-right:5px;vertical-align:middle">Mail me</a></td>
                                                              <td align="left" valign="top" width="50%" style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px;border:0" id="esd-menu-id-1"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#666666;font-size:14px"><img src="https://fbeioii.stripocdn.email/content/guids/CABINET_3b670d78779801705eef224a1b9fbd70/images/60191614948456055.png" alt="ROMMANA 1068 Tunis, Tunisie" title="ROMMANA 1068 Tunis, Tunisie" align="absmiddle" width="20" style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;padding-right:5px;vertical-align:middle">ROMMANA 1068 Tunis, Tunisie</a></td>
                                                             </tr>
                                                           </table></td>
                                                         </tr>
                                                         <tr>
                                                          <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0">
                                                           <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                             <tr>
                                                              <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img title="Facebook" src="https://fbeioii.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                                                              <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img title="Slack" src="https://fbeioii.stripocdn.email/content/assets/img/messenger-icons/logo-black/slack-logo-black.png" alt="Slack" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                                                              <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img title="Telegram" src="https://fbeioii.stripocdn.email/content/assets/img/messenger-icons/logo-black/telegram-logo-black.png" alt="Telegram" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                                                              <td align="center" valign="top" style="padding:0;Margin:0"><img title="Skype" src="https://fbeioii.stripocdn.email/content/assets/img/messenger-icons/logo-black/skype-logo-black.png" alt="Skype" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                                             </tr>
                                                           </table></td>
                                                         </tr>
                                                       </table></td>
                                                     </tr>
                                                   </table><!--[if mso]></td></tr></table><![endif]--></td>
                                                 </tr>
                                               </table></td>
                                             </tr>
                                           </table>
                                           <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                                             <tr>
                                              <td class="es-info-area" align="center" style="padding:0;Margin:0">
                                               <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                                                 <tr>
                                                  <td align="left" style="padding:20px;Margin:0">
                                                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                     <tr>
                                                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                         <tr>
                                                          <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#CCCCCC;font-size:12px">You are receiving this email because you have visited our site or asked us about the regular newsletter. Make sure our messages get to your Inbox (and not your bulk or junk folders).<br><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px;line-height:18px" href="https://viewstripo.email">Privacy police</a> | <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px;line-height:18px" href="">Unsubscribe</a></p></td>
                                                         </tr>
                                                       </table></td>
                                                     </tr>
                                                   </table></td>
                                                 </tr>
                                               </table></td>
                                             </tr>
                                           </table></td>
                                         </tr>
                                       </table>
                                      </div>
                                     </body>
                                    </html>`,
                                    attachments: [
                                        {
                                            filename: 'fileName.pdf',
                                            path: './File/Test.pdf',
                                            contentType: 'application/pdf'
                                        },
                                        {
                                            filename: 'image.png',
                                            path: './File/utm-mesrs.jpg',
                                        }]
                                };
                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        console.error(error);
                                        res.status(500).send('Error sending email');
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                        res.status(200).res.send({ message: 'Email sent successfully' });
                                    }
                                });
                    })})
                    } else {
                        await EventModel.findOneAndUpdate(
                            { _id: event._id, title: req.body.title },
                            req.body,
                            { new: true }
                        ).then(result => {
                            res.status(200).json(result)
                        })
                    }
                })
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
}
const DeleteEventTitle = async (req, res) => {
    try {
        const data = await EventModel.findOneAndRemove({ title: req.params.title })
        res.status(200).json({ message: "deleted" })

    } catch (error) {
        res.status(404).json(error.message)
    }
}
const DeleteSingleEventUser = async (req, res) => {
    try {
        EventModel.findOne({ _id: req.params.id })
        .then(async(event) => {
       await EventlistModels.findOne({ title: event.title })
        .then(async(eventList) => {
            eventList.participation=eventList.participation-1;
            await EventlistModels.findOneAndUpdate(
                { _id: eventList._id},
                eventList,
                { new: true }
            )  
        })})

        const data = await EventModel.findOneAndRemove({ _id: req.params.id })
        res.status(200).json({ message: "deleted" })

    } catch (error) {
        res.status(404).json(error.message)
    }
   
}
const FindSingleEventUser = async (req, res) => {
    try {
        const data = await EventModel.findOne({ user: req.user.id, title: req.params.title })

        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)

    }
}
const FindAllEventUser = async (req, res) => {
    try {
        const data = await EventModel.find({ user: req.user.id })
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)

    }
}
const FindAllEventByTitle = async (req, res) => {
    try {
        console.log(req.params.title)
        const data = await EventModel.find({ title: req.params.title })
        console.log("data")
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)

    }
}
//eventtest
const eventtest = async (req, res) => {
    const { errors, isValid } = ValidateEvent(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {
            EventModel.findOne({ _id: req.body._id })
                .then(async (event) => {
                    if (!event) {
                        res.status(404).json({ message: "error" })
                    } else {
                        await EventModel.findOneAndUpdate(
                            { _id: event._id },
                            req.body,
                            { new: true }
                        ).then(result => {
                            if(req.body.change=="j1")
                            {EventlistModels.findOne({ title: req.body.title })
                            .then(async(eventList) => {
                                eventList.j1=eventList.j1+1;
                                await EventlistModels.findOneAndUpdate(
                                    { _id: eventList._id},
                                    eventList,
                                    { new: true }
                                )  
                            })}
                            if (req.body.change=="j2")
                            {EventlistModels.findOne({ title: req.body.title })
                            .then(async(eventList) => {
                                eventList.j2=eventList.j2+1;
                                await EventlistModels.findOneAndUpdate(
                                    { _id: eventList._id},
                                    eventList,
                                    { new: true }
                                )  
                            })}
                            if (req.body.change=="j3")
                            {EventlistModels.findOne({ title: req.body.title })
                            .then(async(eventList) => {
                                eventList.j3=eventList.j3+1;
                                await EventlistModels.findOneAndUpdate(
                                    { _id: eventList._id},
                                    eventList,
                                    { new: true }
                                )  
                            })}
                            if (req.body.change=="j4")
                            {EventlistModels.findOne({ title: req.body.title })
                            .then(async(eventList) => {
                                eventList.j4=eventList.j4+1;
                                await EventlistModels.findOneAndUpdate(
                                    { _id: eventList._id},
                                    eventList,
                                    { new: true }
                                )  
                            })}
                            if (req.body.change=="j5")
                            {EventlistModels.findOne({ title: req.body.title })
                            .then(async(eventList) => {
                                eventList.j5=eventList.j5+1;
                                await EventlistModels.findOneAndUpdate(
                                    { _id: eventList._id},
                                    eventList,
                                    { new: true }
                                )  
                            })}
                            if (req.body.change=="j6")
                            {EventlistModels.findOne({ title: req.body.title })
                            .then(async(eventList) => {
                                eventList.j6=eventList.j6+1;
                                await EventlistModels.findOneAndUpdate(
                                    { _id: eventList._id},
                                    eventList,
                                    { new: true }
                                )  
                            })}
                            if (req.body.change=="j7")
                            {EventlistModels.findOne({ title: req.body.title })
                            .then(async(eventList) => {
                                eventList.j7=eventList.j7+1;
                                await EventlistModels.findOneAndUpdate(
                                    { _id: eventList._id},
                                    eventList,
                                    { new: true }
                                )  
                            })}

                            res.status(200).json(result)
                            
                    })
                    }
                })
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
}
const UpdteEvent = async (req, res) => {
    const { errors, isValid } = ValidateEvent(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {
            console.log("")
            console.log()
            console.log("title")
            console.log(req.body.title)
            EventModel.findOne({ _id: req.body._id })
                .then(async (event) => {
                    if (!event) {


                        res.status(404).json({ message: "error" })
                    } else {
                        await EventModel.findOneAndUpdate(
                            { _id: event._id },
                            req.body,
                            { new: true }
                        ).then(result => {
                            res.status(200).json(result)
                        })
                    }
                })
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
}
const delaitCommentEvent = async (req, res) => {
    const { errors, isValid } = ValidateEvent(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {
            EventModel.findOne({ _id: req.body._id })
                .then(async (event) => {
                    if (!event) {
                        res.status(404).json({ message: "error" })
                    } else {
                         req.body.comment = "";
                        await EventModel.findOneAndUpdate(
                            { _id: event._id }, req.body,
                            { new: true }
                        ).then(result => {
                            res.status(200).json(result)
                        })
                    }
                })
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
}
module.exports = {
    AddEvent,
    FindSingleEventUser,
    FindAllEventUser,
    DeleteEventTitle,
    DeleteSingleEventUser,
    FindAllEventByTitle,
    UpdteEvent,
    eventtest,
    delaitCommentEvent
}