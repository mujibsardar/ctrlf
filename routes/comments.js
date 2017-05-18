//comments routes
const
  express = require('express'),
  commentsRouter = express.Router(),
  commentsController = require('../controllers/comments.js'),
  Comment = require('../models/Comment.js'),
  request = require('request'),
  apiUrl = 'https://arcane-hollows-97544.herokuapp.com/api/comments'



// commentsRouter.get('/', (req, res) => {
//   Comment.find({}, (err, comments) => {
//     res.json(comments)
//   })
// })


commentsRouter.get('/', (req, res) => {
  request(apiUrl, (err, responseObj, body) => {
    console.log(responseObj)
    console.log(body)
    if (err) {
      console.log(err)
    } else {
      var parsedBody = JSON.parse(body)
      var comments = parsedBody.comments
      res.json(comments)
    }
  })
})

module.exports = commentsRouter
