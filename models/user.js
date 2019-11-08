var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   username: String,
   password: String
}, {collection: 'users'});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);