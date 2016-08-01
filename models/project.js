const mongoose = require('mongoose')

let projectSchema = new mongoose.Schema({
  name: String,
  picture: String,
  description: String,
  github: String,
  heroku: String,
  ghPages: String
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
