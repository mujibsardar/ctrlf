//webpage routes
const
  express = require('express'),
  webpageRouter = express.Router(), //create a router for webpage
  Webpage = require('../models/Webpage.js'), //now that we have the controller file separated, this doesn't need to be required.
  webpagesController = require('../controllers/webpages.js') //require webpages controller file


  webpageRouter.route('/')
    .get(webpagesController.index)
    .post(webpagesController.create)

webpageRouter.route('/show/')
  .get(webpagesController.show)

webpageRouter.route('/show/:id')
  .get(webpagesController.show)

  webpageRouter.route('/createOrFind')
  .post(webpagesController.createOrFind)

module.exports = webpageRouter
