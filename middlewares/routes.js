let indexRoute    = require("../routes/index"),
    newsRoute     = require("../routes/news"),
    bannerRoute   = require("../routes/banner"),
    calendarRoute = require("../routes/calendar");

class Routes {

  static load(app) {

    // USING ROUTES
    app.use(indexRoute);
    app.use("/noticias", newsRoute);
    app.use("/banner", bannerRoute);
    app.use("/calendar", calendarRoute);

  }
}

module.exports = Routes;