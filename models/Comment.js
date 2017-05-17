//Comment model
const
  express = require('express'),
  mongoose = require('mongoose'),
  commentSchema = mongoose.Schema({
    user: { // reference to a user as a foreign key
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userName: String,
    webpage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Webpage'
    },
    body: String
  })

module.exports = mongoose.model('Comment', commentSchema)
