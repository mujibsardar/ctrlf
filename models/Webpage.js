// Webpage model
const
  mongoose = require("mongoose"),
  // commentSchema = mongoose.Schema({
  //   user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // reference to a user as a foreign key
  //   name: String
  // }),
  // Model of webpage data
  webpageSchema = mongoose.Schema({
    url: String,
    helpfulCount: Number
  })

module.exports = mongoose.model('Webpage', webpageSchema)
