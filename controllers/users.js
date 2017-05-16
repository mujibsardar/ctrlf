const User = require("../models/User.js")




module.exports = {
  index: (req, res) => {
    User.find({}, (err, users) => {
      res.json(users)
    })
  },
  show: (req,res) => {
    User.findById(req.params.id, (err, user) => {
      res.json(user)
    })
  },
  createComment: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      user.comments.push(req.body)
      user.save((err) => {
        res.json(user)
      })
    })
  }
}
