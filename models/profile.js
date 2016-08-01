const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  name: String,
  tagline: String,
  about: String,
  contact: String,
  github: String
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile
