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
  passport = require('passport') //middleware for authentication


//environment port
const
  port = process.env.PORT || 3000,
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/web-meta-data'

//connect to mongodb
mongoose.connect(mongoConnectionString, (err) => {
  console.log(err || 'Connected to MongoDB:', mongoConnectionString)
})

//store session info as a 'sessions' collecion in mongo
const store = new MongoDBStore({
  uri: mongoConnectionString,
  collection: 'sessions'
})

//middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

//ejs config
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//establish a path to public folder: no route needed because we just need one file
app.use(express.static(__dirname + '/public'))

//server
app.listen(port, (err) => {
  console.log(err || "Server running on", port)
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
