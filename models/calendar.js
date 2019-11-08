var mongoose = require("mongoose");

var calendarSchema = new mongoose.Schema({
   date: Date,
   title: String,
   description: String,
   monthRef: Date
   
}, {collection: 'calendar'});

module.exports = mongoose.model('Calendar', calendarSchema);