const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv').load({silent: true}),
  PORT = 3000

//connect to mongodb
mongoose.connect('mongodb://localhost/web-meta-data', (err) => {
  console.log(err || 'Connected to mongodb!')
})

//establish a path to public folder: no route needed because we just need one file
app.use(express.static(__dirname + '/public'))

//middleware
app.use(logger('dev'))
app.use(bodyParser.json())

//server
app.listen(PORT, (err) => {
  console.log(err || "Server running on", PORT)
})
