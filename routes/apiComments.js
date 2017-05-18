//comments routes
const
  express = require('express'),
  apiCommentsRouter = express.Router(),
  commentsController = require('../controllers/comments.js'),
  Comment = require('../models/Comment.js'),
  request = require('request')


apiCommentsRouter.get('/', (req, res) => {
  Comment.find({}, (err, comments) => {
      if (err) {
        console.log(err)
      } else {
        res.json(comments)
      }
    })
  })




module.exports = apiCommentsRouter
