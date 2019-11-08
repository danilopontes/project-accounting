let utils    = require('../middlewares/utils');
let express  = require("express");
let router   = express.Router();
let Calendar = require("../models/calendar");


// INDEX
router.get("/", utils.isLoggedIn, function(req, res, next){
    Calendar.find({}, null, {sort: {date: 1}}, function(err, allCalendar){
          if(err){
              console.log(err);
          } else {
              res.render("calendar/index",{ calendar: allCalendar});
          }
    });
});
// NEW
router.get("/new", utils.isLoggedIn, function(req, res, next){
    
    res.render("calendar/new");   
    
});

// CREATE
router.post("/", utils.isLoggedIn, function(req, res, next){
   
   Calendar.create(req.body.calendar, function(err, newCalendar){
       if(err){
           console.log(err);
       } else {
           res.redirect("/calendar");
       }
   });
    
});

module.exports = router;