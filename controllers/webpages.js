//Webpage controllers
const
  Webpage = require('../models/Webpage.js'), //require the Webpage model to be able to create functions on the database
  User = require("../models/User.js"),
  CtrlfComment = require("../models/Comment.js")

module.exports = {
  index: (req, res) => {
    Webpage.find({},(err, webpages) => {
      if (err) {console.log(err)}
      res.json(webpages)
    })
  },
  commentsIndex: (req, res) => {
    CtrlfComment.find({webpage:req.params.id}, (err,comments) => {
      res.json(comments)
    })
  },
  show: (req, res) => {
    var id = req.params.id
    Webpage.findById(id, (err, webpage) => {
      CtrlfComment.find({webpage: id}, (err,comments) => {
        if(err) return console.log(err);
        console.log(comments)
        res.render("show", {webpage, comments})
      } )
    })

  },
  create: (req, res) => {
    Webpage.create(req.body, (err, newlyPage) => {
    if(err) return console.log(err)
    console.log("New Page Created ", newlyPage);
    res.redirect('/webpages/')
    })
  },
  //customized functions here
  //find crtlF-webpage object or return null
  //findOrReturnNull
  createOrFind: (req, res) => {
    // We need to check if the URL is valid
    Webpage.find( {url:req.body.url} , function(errs, webpage){
      if(errs) console.log(errs);
      var newPageID
      if (webpage.length > 0) {
        newPageID = webpage[0]._id
      } else {
        Webpage.create({url: req.body.url}, (err, newlyPage) => {
          newPageID = newlyPage._id
        })
      }
      res.json(newPageID)
    })
  },
  createComments: (req, res) => {
    var newComment = new CtrlfComment(req.body)
    newComment.webpage = req.params.id
    newComment.save((err) => {
      res.json({success: true, message: "new comment created!", comment: newComment})
    })
  },
  findbyUrl: (req,res) => {
    console.log("findbyUrl controller....");
    var url = req.body.url
    console.log(url);
    Webpage.find( {url:url} , findPage)

    function findPage (errs, webpage){
      console.log("findbyUrl findpage....");
      if(errs) console.log(errs);
      if (webpage.length > 0) {
        newPageID = webpage[0]._id
        CtrlfComment.find({webpage:newPageID}, findComments)
      } else {
        // No website found matching the url given
        res.json(0)
        }
      }

      function findComments(err,comments) {
        console.log("findbyComments findpage....");
        if(err) console.log(err)
        console.log("Controller Number of comments: ", comments.length)
        res.json(comments.length)
      }
  }
}
