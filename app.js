const db         = require('./db');
const settings   = require('./middlewares/settings');
const routes     = require('./middlewares/routes');
const express    = require("express");
const app        = express();

db.connect();
settings.load(app);
routes.load(app);

// LISTEN
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Our app is running on port: ' + port);
});
