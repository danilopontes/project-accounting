var mongoose = require("mongoose");

var agora = new Date();
agora.setHours( agora.getHours() - 2);

var newsSchema = new mongoose.Schema({
    newsId: String,
    title: String,
    description: String,
    body: String,
    date: { type: Date, default: agora}

}, {collection: 'news'});

module.exports = mongoose.model('News', newsSchema);