const User = require('../models/user');
const { passportSecret } = require('../config.json');
const bodyParser   = require("body-parser");
const methodOverride   = require("method-override");
const express          = require("express");
const expressSanitizer = require("express-sanitizer");
const passport         = require("passport");
const LocalStrategy    = require("passport-local");
const session          = require("express-session");
const fileUpload       = require('express-fileupload');
const path             = require('path');
const favicon          = require('serve-favicon');

class Settings {

  static load(app) {

    // GENERAL CONFIGURATION
    app.set("view engine", "ejs");
    app.use(express.static(path.join(__dirname, '../', 'public')));
    app.use(favicon(path.join(__dirname, '../', 'public', 'img', 'favicon.ico')));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(expressSanitizer());
    app.use(methodOverride("_method"));
    app.use(fileUpload());

    // PASSPORT CONFIGURATION
    app.use(session({
        secret: passportSecret,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());


    app.use(function(req, res, next){
      res.locals.currentUser = req.user;
      next();
    });

        
  }
}

module.exports = Settings;