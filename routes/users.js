//user routes
const
  express = require('express'), //for express method chains
  passport = require('passport'), //authentication
  userRouter = express.Router() //create a user router

//login path
userRouter.route('/login')
  .get((req, res) => { //show login form
    res.render('login', {message: req.flash('loginMessage')} ) // NOTE GETTING the message
  })
  .post(passport.authenticate('local-login', { //log the user in
    successRedirect: '/profile',
    failureRedirect: '/login'
  }))

//signup path
userRouter.route('/signup')
  .get((req, res) => { //show the signup form
    res.render('signup', {message: req.flash('signupMessage')} ) // NOTE GETTING the message
  })
  .post(passport.authenticate('local-signup', { //signup and log the user in
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }))

//profile path
//show the profile ONLY if they are logged in
userRouter.get('/profile', isLoggedIn, (req, res) => { //when somebody tries to see the profile, check to see if they are logged in first
  res.render('profile', {user: req.user}) //req.user = current user
})

//logout path
//logout: destroy the user's session
userRouter.get('/logout', isLoggedIn, (req, res) => {
  req.logout()// session to nil in rails
  res.redirect('/')
})

//middleware, like "before action" in RoR
//a method used to authorize a user BEFORE allowing them to proceed to the profile page:
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {//is there a cookie that can be verified?
    return next() //go on the next route, allow the action
  } else { //if not verified
    res.redirect('/')
  }
}

module.exports = userRouter //export to require in our server.js
