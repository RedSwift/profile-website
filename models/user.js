const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  auth_token: {type: String, unique: true}
})

userSchema.pre('save', function (done) {
  const user = this
  if (!user.auth_token) user.auth_token = uuid.v4()
  bcrypt.genSalt(8, (err, salt) => {
    if (err) return done(err)

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return done(err)
      user.password = hash
      done()
    })
  })
})

userSchema.methods.authenticate = function (password, callback) {
  bcrypt.compare(password, this.password, callback)
}

const User = mongoose.model('User', userSchema)

module.exports = User
