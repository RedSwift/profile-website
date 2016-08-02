const Skill = require('../models/skill')

let postSkill = function (req, res) {
  let newSkill = new Skill()

  newSkill.skill = req.body.skill
  newSkill.rating = req.body.rating

  newSkill.save((err, result) => {
    if (err) res.status(401).json(`Error occured while saving: ${err}`)
    else res.status(201).json(result)
  })
}

module.exports = {
  postSkill: postSkill
}
