// Webpage model
const
  mongoose = require("mongoose"),
  // Model of webpage data
  webpageSchema = mongoose.Schema({
    url: String,
    helpfulCount: Number
  })

module.exports = mongoose.model('Webpage', webpageSchema)
