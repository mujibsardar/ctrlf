const
  express = require('express'), //router and controller
  app = express(), //express app
  mongoose = require('mongoose'), //mongoDB
  logger = require('morgan'), //http request logs
  ejs = require('ejs'), //view template
  ejsLayouts = require('express-ejs-layouts'), //template layout handler
  bodyParser = require('body-parser'), //json message translation to usable data
  dotenv = require('dotenv').load({silent: true}), //key protection
  Bing = require('node-bing-api')({ accKey:  process.env.BING_SEARCH_ACCESS_TOKEN}), // Import Bing API package
  flash = require('connect-flash'), //send msgs to a view depending on login/logout
  cookieParser = require('cookie-parser'), //translates session data and make it accessible in our app
  session = require('express-session'), //creates session cookies for authenticated users
  MongoDBStore = require('connect-mongodb-session')(session), //session storage on mongoDB
  passport = require('passport'), //middleware for authentication
  passportConfig = require('./config/passport.js'),
  userRoutes = require('./routes/users.js'), //users routes
  webpageRoutes = require('./routes/webpages.js') //webpages routes
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


//root route
app.get('/', (req,res) => {
	res.render('index')
})

//search query route. All searches will route through here
app.post('/search', function(req,res){
  var body = req.body
  var searchText = body.text
  var searchResults = {}

  if(searchText && searchText != ""){
    Bing.web(searchText, {
      top: 10
    }, function(error, response, body){
        if (error) console.log(error)
          var webpageArray = []
          for(var i = 0; i < 10; i++){
            if(body.webPages.value[i]){
              console.log(body.webPages.value[i].url);
              webpageArray.push({name: body.webPages.value[i].name,
                              snippet: body.webPages.value[i].snippet,
                              uri: body.webPages.value[i].url,
                              displayUrl: body.webPages.value[i].displayUrl,
                              fullObj: body})
              }
          }
          searchResults = {webpages: webpageArray}
          res.json(searchResults)
    })
  }
})

//add routes file
app.use('/users', userRoutes)
app.use('/webpages', webpageRoutes)

//server
app.listen(port, (err) => {
  console.log(err || "Server running on", port)
})
