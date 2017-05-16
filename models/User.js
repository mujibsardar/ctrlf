//User model
const
  mongoose = require('mongoose'), //to store and grab from the database
  bcrypt = require('bcrypt-nodejs'),//password encryption/hashing
  // commentSchema = new mongoose.Schema({   // Establish structure of embedded comments
  //     webpage: {type: mongoose.Schema.Types.ObjectId, ref: 'Webpage'}, // reference to a user as a foreign key
  //     body: String
  // }) //because users comment on webpages
  userSchema = new mongoose.Schema({
    local: { //local to our application
      name: String,
      email: String,
      password: String
    }
  //  comments: [commentSchema]
  })

//generate the password digest
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) //encrypt the password with 10 Salting(level of encryption)
}

//check to see if the password is correct
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password) //compare password $ password digest: returns boolean
}

module.exports = mongoose.model('User', userSchema)
