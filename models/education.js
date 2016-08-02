const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
  school: String,
  discipline: String,
  graduated: String
})

const Education = mongoose.model('Education', educationSchema)

module.exports = Education
