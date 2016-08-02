const Profile = require('../models/profile.js')

let getProfile = function (req, res) {
  Profile.findOne({}, (err, profile) => {
    if (err) res.status(401).json(`Error: ${err}`)
    else res.status(200).json(profile)
  })
}

let putProfile = function (req, res) {
  Profile.findOne({}, (err, profile) => {
    if (err) res.status(401).json(`Error: ${err}`)

    // updating profile if input exists
    if (req.body.name) profile.name = req.body.name
    if (req.body.tagline) profile.tagline = req.body.tagline
    if (req.body.about) profile.about = req.body.about
    if (req.body.contact) profile.contact = req.body.contact
    if (req.body.github) profile.github = req.body.github

    // saving profile
    profile.save((err, result) => {
      if (err) res.status(401).json(`Error occurred while saving: ${err}`)
      else res.status(201).json(result)
    })
  })
}

module.exports = {
  getProfile: getProfile,
  putProfile: putProfile
}
