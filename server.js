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
  passportConfig = require('./config/passport.js'),
  userRoutes = require('./routes/users.js'), //users routes
  webpagesModel = require('./models/Webpage.js') // webpage model
  
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

//session + passport
app.use(session({ //issue cookies and send it to the clients
	secret: "teamctrlf",
	cookie: {maxAge: 60000000}, //login time: expiration of cookie
	resave: true, //every request comes in, create a new cookie: reset the expiration
	saveUninitialized: false, //do you want to create a cookie that's not logged in? no
	store: store//where do you want to store the cookie
}))

//passport middleware
app.use(passport.initialize()) //all of the settings with the Stategy, apply to each request
app.use(passport.session()) //hey passport, generate a cookie whenever a user logs in

//custom middleware to view current user
app.use((req, res, next) => {
	app.locals.currentUser = req.user //locals: list of all the variables available in all the views
	app.locals.isLoggedIn = !!req.user
	next()
})

//establish a path to public folder: no route needed because we just need one file
app.use(express.static(__dirname + '/public'))

//add user routes file
app.use('/', userRoutes)

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
