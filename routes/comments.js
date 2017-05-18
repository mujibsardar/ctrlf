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

commentsRouter.patch('/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedComment) {
    if(err) {
      res.json({message: "Couldn't update the comment", success: false})
    } else {
      res.json({message: "Comment Updated!", success: true, comment: updatedComment})
    }
  })
})


module.exports = commentsRouter
