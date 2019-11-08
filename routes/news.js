let utils   = require('../middlewares/utils');
let express = require("express");
let router  = express.Router();
let async   = require("async");
let News    = require("../models/news");

// NOTICIAS
router.get("/", function(req, res, next){
    
    var listNews = News.find({}).sort({date: 'desc'});
    
    var data = {
        News: listNews.exec.bind(listNews)
    };
    
    async.parallel(data, function(err, results){
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.render("news/index", {data: results});
    });
});


// NEW NEWS
router.get("/new", utils.isLoggedIn, function(req, res, next){
        res.render("news/new");
});

// CREATE NEWS
router.post("/", utils.isLoggedIn, function(req, res){
    
    
    News.create(req.body.news, function(err, newNews){
        if(err){
            console.log(err);
        } else {
            res.redirect("/noticias/" + newNews._id);
        }
    });
});


// SHOW NEWS
router.get("/:id", function(req, res, next){
    
    var newsData = News.findById(req.params.id, function (err, news) {
        if (err){
            console.log(err);
        }
    });
    
    var data = {
        News: newsData.exec.bind(newsData)
    };

    async.parallel(data, function(err, results){
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.render("news/show", {data: results});
    });
});

// EDIT NEWS
router.get("/:id/edit", utils.isLoggedIn, function(req, res, next){
    
    var newsData = News.findById(req.params.id, function (err, news) {
        if (err){
            console.log(err);
        }
    });
    
    var data = {
        News: newsData.exec.bind(newsData)
    };
    
    async.parallel(data, function(err, results){
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.render("news/edit", {data: results});
    });
});

// UPDATE NEWS
router.put("/:id", utils.isLoggedIn, function(req, res){

    News.findByIdAndUpdate(req.params.id, req.body.news, function(err, updatedNews){
        if(err){
            console.log(err);
        } else {
            res.redirect("/noticias/" + req.params.id);
        }
    });
});

// DELETE NEWS
router.delete("/:id", utils.isLoggedIn, function(req, res){
    
    News.findByIdAndRemove(req.params.id, function(err){
       
       if(err){
           console.log(err);
       } else{
           res.redirect("/noticias");
       }
    });
});

module.exports = router;