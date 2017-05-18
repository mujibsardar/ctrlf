//comments routes
const
  express = require('express'),
  commentsRouter = express.Router(),
  commentsController = require('../controllers/comments.js'),
  Comment = require('../models/Comment.js')


commentsRouter.delete('/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, deletedComment) => {
    if(err) {
      res.json({message: "There was a problem...", success: false});
    } else {
      res.json({message: "Comment was deleted!", success: true})
    }
    })
  })




module.exports = commentsRouter
