// Webpage model
const
  mongoose = require("mongoose"),
  commentSchema = mongoose.Schema({
    name: String
  }),
  webpageSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    url: String,
    comments: [commentSchema]
  })

  module.exports = mongoose.model('Webpage', webpageSchema)
