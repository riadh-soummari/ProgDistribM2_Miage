require("./models/db")
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport");
var fileUpload = require('express-fileupload');
var session = require('express-session');
const methodOverride = require('method-override');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const corsMiddleware = require('./middlewares/cors.middleware');


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var publicationRouter = require('./routes/publications.router')
var recipeRouter = require('./routes/recipes.router')



const app = express();

app.use(corsMiddleware);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'https://img.spoonacular.com'],
      styleSrc: ["'self'"]
    }
  }
}));  


const limiter = rateLimit(config.rateLimit[process.env.NODE_ENV === 'production' ? 'prod' : 'local']);
app.use(limiter);

app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(fileUpload());

 
//Setup session
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false  
}));


//Initialize passport
app.use(passport.initialize());

//Use passport to deal with session
app.use(passport.session()); 

app.use('/', indexRouter);
//Use Application Routes
app.use('/', authRouter);
app.use('/', recipeRouter);
app.use('/', publicationRouter);


module.exports = app;
