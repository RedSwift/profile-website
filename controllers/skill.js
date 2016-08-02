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

let deleteSkill = function (req, res) {
  Skill.findOne({_id: req.params.id}, (err, skill) => {
    if (err) res.status(401).json(`Error while finding skill: ${err}`)
    else {
      skill.remove()
      res.status(201).json('successfully removed document')
    }
  })
}

module.exports = {
  postSkill: postSkill,
  deleteSkill: deleteSkill
}
