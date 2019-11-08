let utils   = require('../middlewares/utils');
let express = require("express");
let router  = express.Router();
let Banner  = require("../models/banner");

// BANNER
router.get("/", utils.isLoggedIn, function(req, res, next){
    Banner.find({}, null, {sort: {order: 1}}, function(err, allBanners){
           if(err){
               console.log(err);
           } else {
              res.render("banner/index",{ banners: allBanners});
           }
    });
});

// NEW BANNER
router.get("/new", utils.isLoggedIn, function(req, res, next){
        res.render("banner/new");
});

// CREATE BANNER
router.post("/", utils.isLoggedIn, utils.bodySan("banner"), function(req, res){
    
    req.body.banner.order = 1;
    
    Banner.find({}, null, function(err, Bann){
        if(err){
            console.log(err);
        } else {
            Bann.forEach(function(Ban, i){
                Ban.order = Ban.order + 1;
                Ban.save();
            })
        }
    });
    
    Banner.create(req.body.banner, function(err, newBanner){
        if(err){
            console.log(err);
        } else {
            res.redirect("/banner");
        }
    })
});

// UPLOAD
router.post('/upload', utils.isLoggedIn, function(req, res) {
  if (!req.files.bannerImage){

        return res.status(400).json({'error': 'Imagem não selecionada.'});
        
  } else {
    
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let bannerImage = req.files.bannerImage;
    let imageName = req.files.bannerImage.name.replace(/\s+/g, '-').toLowerCase();
    
    // Use the mv() method to place the file somewhere on your server
    bannerImage.mv('public/upload/home_banner/' + imageName, function(err) {
        if (err){
            return res.status(500).send(err);
        } else {
            res.end(imageName);
        }
    });
  }
});

// EDIT BANNER
router.get("/:id/edit", utils.isLoggedIn, function(req, res, next){
    
    var bannerData = Banner.findById(req.params.id, function (err, Banner) {
        if (err){
            console.log(err);
        } else {
            res.render("banner/edit", { banner: Banner});
        }
    });
});

// UPDATE BANNER
router.put("/:id", utils.isLoggedIn, utils.bodySan("banner"), function(req, res){

    Banner.findByIdAndUpdate(req.params.id, req.body.banner, function(err, updatedBanner){
        if(err){
            console.log(err);
        } else {
            res.redirect("/banner/");
        }
    });
});

// DELETE BANNER
router.delete("/:id", utils.isLoggedIn, function(req, res){
    

    Banner.findByIdAndRemove(req.params.id, function(err, bannerRemoved){
       
       if(err){
           console.log(err);
       } else{
            Banner.find({}, null, function(err, allBanners){
                if(err){
                    console.log(err);
                } else{
                    allBanners.forEach(function(Banner, i){
                        if(Banner.order > bannerRemoved.order){
                            Banner.order = Banner.order - 1;
                            Banner.save();   
                        }
                    });
                }
            });
           res.redirect("/banner");
       }
    });
});

// CHANGE ORDER BANNER
router.put("/:id/order", utils.isLoggedIn, function(req, res){

    Banner.findById(req.params.id, function(err, updatedBanner){
        if(err){
            console.log(err);
        } else {
            if(req.body.submit == "up"){
                var x = 1;
            } else if(req.body.submit == "down"){
                var x = -1;
            }
            Banner.findOne({ 'order': updatedBanner.order - x}, null, function(err, otherBanner){
                if(err){
                    console.log(err);
                } else{
                    if(otherBanner == null){
                        res.redirect("/banner");
                    } else{
                        if(x == 1){
                            otherBanner.order++
                            updatedBanner.order--
                        } else if(x == -1){
                            otherBanner.order--
                            updatedBanner.order++
                        }
                        otherBanner.save(function (err, product1, numAffected1) {
                            if(err){
                                console.log(err);
                            } else{
                                updatedBanner.save(function (err, product2, numAffected2) {
                                    if(err){
                                        console.log(err);
                                    } else{
                                        Banner.find({}, null, {sort: {order: 1}}, function(err, allBanners){
                                               if(err){
                                                    console.log(err);
                                               } else {
                                                    res.end(JSON.stringify(allBanners));
                                               }
                                        });
                                                        
                                        }
                                });
                                
                            }
                        });
                        
                    }
                }
            });
        }
    });
    
});


module.exports = router;