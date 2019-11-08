var mongoose = require("mongoose");

var bannerSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    button: Boolean,
    buttonUrl: String,
    status: Boolean,
    order: Number
}, {collection: 'home_banner'});

// Banner.create({
//   image: "/upload/home_banner/c3-min.jpg",
//   title: "Banner 3",
//   description: "descrição banner 3",
//   button: false
// });

module.exports = mongoose.model('Banner', bannerSchema);