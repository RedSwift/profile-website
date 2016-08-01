const mongoose = require('mongoose')

let projectSchema = new mongoose.Schema({
  name: String,
  picture: String,
  description: String,
  github: String,
  heroku: String,
  ghPages: String
})

let Project = mongoose.model('Project', projectSchema)
module.exports = Project
