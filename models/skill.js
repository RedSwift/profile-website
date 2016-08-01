const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
  skill: String,
  rating: Number
})

const Skill = mongoose.model('Skill', skillSchema)

module.exports = Skill
