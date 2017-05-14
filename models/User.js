const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    local: {
      name: String,
      email: String,
      password: String
    }
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
