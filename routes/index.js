var express   = require("express");
var router    = express.Router();
var passport  = require("passport");
var async     = require("async");
var nodeCal   = require("node-calendar");
var User      = require("../models/user");
var Banner    = require("../models/banner");
var News      = require("../models/news");
var Calendar  = require("../models/calendar");


router.get("/", function(req, res){
    
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    
    var start = new Date(year, month);
    var end = new Date(year, month+1);

    var listBanner = Banner.find({status: true}).sort({order : 1});
    var listNews = News.find({}).sort({date: 'desc'}).limit(6);
    var listCalendar = Calendar.find({date: {$gte: start, $lt: end}}).sort({date: 1});
    
    var nodeCalendar = nodeCal.monthrange(date.getFullYear(), date.getMonth()+1);
    
    var data = {
        Banners: listBanner.exec.bind(listBanner),
        News: listNews.exec.bind(listNews),
        Calendar: listCalendar.exec.bind(listCalendar)
    };
    
    // console.log(data.Calendar);
    
    async.parallel(data, function(err, results){
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.render("home", {data: results, date: date, nodeCalendar: nodeCalendar});
    });
});

// CALENDAR
router.post("/agenda/", function(req, res){
    
    var data = req.body.agenda;
    
    console.log(data);
    
    if(data.length <= 7){
        
        if(data.length < 7){
            var reqMonth = data.substring(0, 1);
            var reqYear = data.substring(2, 6);
        } else {
            var reqMonth = data.substring(0, 2);
            var reqYear = data.substring(3, 7);
        }
    
        var monthRange = nodeCal.monthrange(reqYear, Number(reqMonth)+1)[1];

        Calendar.find({date : {"$gte": new Date(reqYear, reqMonth, 01), "$lte": new Date(reqYear, reqMonth, monthRange)}}, null, {sort: {date: 1}} ,function(err, allCalendar){
              if(err){
                  console.log(err);
              } else {
                  console.log(allCalendar);
                  res.end(JSON.stringify(allCalendar));
              }
        });        
        
    } else {

    Calendar.find({date: data}, null, {sort: {date: 1}}, function(err, allCalendar){
          if(err){
              console.log(err);
          } else {
              console.log(allCalendar);
              res.end(JSON.stringify(allCalendar));
          }
    });
    
    }
});

//CALENDAR CHANGE MONTH 
router.post("/agenda/changemonth", function(req, res){
    
    var data = req.body.changemonth;

    if(data.length < 7){
        var reqMonth = data.substring(0, 1);
        var reqYear = data.substring(2, 6);        
    } else {
        var reqMonth = data.substring(0, 2);
        var reqYear = data.substring(3, 7);        
    }
    
        if(reqMonth == -1){
            reqMonth = 11;
            reqYear--;
        } else if(reqMonth == 12){
            reqMonth = 0;
            reqYear++;
        }
        
        var date = new Date(reqYear, reqMonth, 01);
        
        var month = date.getMonth();
        var year = date.getFullYear();
        
        var start = new Date(year, month);
        var end = new Date(year, month+1);       
            
        var listCalendar = Calendar.find({date: {$gte: start, $lt: end}}).sort({date: 1});
        
        var data = {
            Calendar: listCalendar.exec.bind(listCalendar)
        };
        
        var nodeCalendar = nodeCal.monthrange(date.getFullYear(), date.getMonth()+1);
        
        console.log("hue");
        console.log(data);
        
        async.parallel(data, function(err, results){
            if(err) {
                res.status(500).send(err);
                return;
            }
            res.send({data: results, date: date, nodeCalendar: nodeCalendar});
        });       
});

// REGISTER ROUTES
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    });
});

// LOGIN ROUTE
router.get("/admin", function(req, res){
   res.render("admin"); 
});
router.post("/admin", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/admin"
    }), function(req, res){
});

// LOGOUT ROUTE
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

module.exports = router;