const UserModel = require("../models/users.models");
const ValidateRegister = require("../validation/Register");
const ValidateLogin = require("../validation/Login");
const Validation = require("../validation/Validation");
const validator = require("validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');

// Configure Nodemailer with your SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'jihed.jridi@utm.tn',
    pass: 'feqtplxciztlayms',
  },
});
function generateRandomNumber() {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}
let output = generateRandomNumber();
console.log(output);
const Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          errors.email = "user exist";
          res.status(404).json(errors);
        } else {
          const mailOptions = {
            from: 'jihed.jridi@utm.tn',
            to: req.body.email,
            subject: 'Subject of your email test ',
            text: `Content of your email code ${output}`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).send('Error sending email');
            } else {
              console.log('Email sent: ' + info.response);
              res.send('Email sent successfully');
            }
          })
          const hash = bcrypt.hashSync(req.body.password, 10)//hashed password
          req.body.password = hash;
          req.body.role = "USER";
          req.body.code = output;
          req.body.validate = false;
          await UserModel.create(req.body);
          res.status(200).json({ message: "success" });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const Login = async (req, res) => {
  const { errors, isValid } = ValidateLogin(req.body)
  try {
    if (!isValid) {
      res.status(404).json(errors)
    } else {
      UserModel.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            errors.email = "not found user"
            res.status(404).json(errors)
          } else {
            if(user.validate==false){
              errors.email = "not verified user"
            res.status(404).json(errors)
            }
            else{
            bcrypt.compare(req.body.password, user.password)
              .then(isMatch => {
                if (!isMatch) {
                  errors.password = "incorrect password"
                  res.status(404).json(errors)
                } else {
                  var token = jwt.sign({
                    id: user._id,
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email,
                    role: user.role
                  }, process.env.PRIVATE_KEY, { expiresIn: '356d' });
                  res.status(200).json({
                    message: "success",
                    token: "Bearer " + token
                  })
                }
              })
          }}
        })
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
}

const ValidateCode = async (req, res) => {
  const { errors, isValid } = Validation(req.body)
  try {
    if (!isValid) {
      res.status(404).json(errors)
    } else {
      UserModel.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            errors.message = "not found user"
            res.status(404).json(errors)
          } else {
            if (validator.equals(req.body.code, user.code)) {
              console.log(user.code)
              console.log(req.body.code)
              errors.message = "incorrect code"
              res.status(404).json(errors)
            }
            else {
              req.body.validate = true;
              UserModel.findOneAndUpdate(
                { email: user.email },
                req.body,
                { new: true }
              ).then(result => {
                res.status(200).json({ message: "success" })
              })

            }

          }
        })
    }}catch (error) {
      res.status(404).json(error.message);
    }
  }
 

const Admin = (req, res) => {
    res.send("welcome admin")
  }

  module.exports = {
    Register,
    Login,
    Admin,
    ValidateCode
  };
