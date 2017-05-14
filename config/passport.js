const
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy, //big passport-local object that contains aconstructor function called Strategy
  User = require('../models/User.js')

//generate a cookie: make a unique cookie string with user object
passport.serializeUser((user, done) => {
  done(null, user.id) //1) null: error 2) id of the user we want to serialize
})

//verfiy cookie: to decode the cookie
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user) //is there a user with that id in the database?
  })
})

//NOTE Local singup
passport.use('local-signup', new LocalStrategy({ //calling it local-singup, not a keyword
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({'local.email': email}, (err, user) => { //check to see if there's already a user
    if (err) return done(err)
    if (user) return done(null, false, req.flash('signupMessage', 'That email is taken.'))//error is null because there was no error specifically, but it has failed NOTE SETTING the message

    var newUser = new User() //if this is reached, that means there was no error, so sign that user up
    newUser.local.name = req.body.name
    newUser.local.email = req.body.email
    newUser.local.password = newUser.generateHash(req.body.password) //in user model, we added a method generateHash
    newUser.save((err, newlyCreatedUser) => { //try to save the user
      if(err) return console.log(err)
      return done(err, newlyCreatedUser, null) //third parameter is for flash message
    })
  })
}))

//NOTE Local login
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({'local.email': email}, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false, req.flash('loginMessage', 'No user found.')) //if there is no user found NOTE SETTING the message
    if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Incorrect password.'))//if password is not valid: in user model, we added a method validPassword

    return done(null, user)
  })
}))

module.exports = passport
