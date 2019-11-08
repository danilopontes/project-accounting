class Utils {

  static isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/admin");
  }

  static bodySan(data) {
    return function(req, res, next) {
      for(var key in req.body[data]) {
          req.body[data][key] = req.sanitize(req.body[data][key]);
      }  
      next();
    }
  }
}

module.exports = Utils;
