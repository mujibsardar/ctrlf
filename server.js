const
  express = require('express'), //router and controller
  app = express(), //express app
  mongoose = require('mongoose'), //mongoDB
  logger = require('morgan'), //http request logs
  ejs = require('ejs'), //view template
  ejsLayouts = require('express-ejs-layouts'), //template layout handler
  bodyParser = require('body-parser'), //json message translation to usable data
  dotenv = require('dotenv').load({silent: true}), //key protection
  // Import Bing API package
  Bing = require('node-bing-api')({ accKey:  process.env.BING_SEARCH_ACCESS_TOKEN}),
  flash = require('connect-flash'), //send msgs to a view depending on login/logout
  cookieParser = require('cookie-parser'), //translates session data and make it accessible in our app
  session = require('express-session'), //creates session cookies for authenticated users
  MongoDBStore = require('connect-mongodb-session')(session), //session storage on mongoDB
  passport = require('passport'), //middleware for authentication
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
