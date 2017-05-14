// Webpage model
const
  mongoose = require("mongoose"),
  // Establish structure of embedded comments
  commentSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // reference to a user as a foreign key
    name: String
  }),
  // Model of webpage data
  webpageSchema = mongoose.Schema({
    url: String,
    comments: [commentSchema]
  })

  module.exports = mongoose.model('Webpage', webpageSchema)
