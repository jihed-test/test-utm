var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');
const passport = require('passport')

var app = express();
//app.use(express.limit(100000000));
app.use(logger('dev'));
//app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(express.json({limit: '500mb'}));
//app.use(express.urlencoded({limit: '500mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* passport */
app.use(passport.initialize())
require('./security/passport')(passport)
/* connect to db */
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected to db"))
.catch(err=>console.log(err))
app.use('/api', indexRouter);


module.exports = app;
