const nodemailer = require('nodemailer');
const ProfileModel = require('../models/profiles.models')
const ValidateProfile = require("../validation/Profile")
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
      text: 'Content of your email',
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