const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv').load({silent: true}),
  // Import Bing API package
  Bing = require('node-bing-api')({ accKey:  process.env.BING_SEARCH_ACCESS_TOKEN}),
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

// Bing search API call, specifying to return only 10 pages
// Display Name, Snippet and URL of the first result
// Search for the phrase "ctrlF Search"
Bing.web("ctrlF Search", {
  top: 10
}, function(error, res, body){
  console.log("Callback from search entered...")
  if (error) console.log(error)
  // bodyOfResults = body
  console.log("Name of Page: ", body.webPages.value[0].name);
  console.log("Snippet: ", body.webPages.value[0].snippet);
  console.log("URL: ", body.webPages.value[0].displayUrl);
})
