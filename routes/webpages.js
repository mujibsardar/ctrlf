//Webpage router
const
  express = require('express'),
  webpageRouter = express.Router(),
  Webpage = require('../models/Webpage.js')

webpageRouter.route('/show/')
  .post((req, res) => {
    
  })

webpageRouter.route('/show/:id')
  .get((req, res) => {

  })

module.exports = webpageRouter
