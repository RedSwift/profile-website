const Project = require('../models/project.js')

let getProject = function (req, res) {
  Project.find({}, function (err, project) {
    if (err) res.status(401).json(`Error: ${err}`)
    else res.status(200).json(project)
  })
}

let postProject = function (req, res) {
  var project = new Project()
  project.name = req.body.name
  project.picture = req.body.picture
  project.description = req.body.description
  project.github = req.body.github
  project.heroku = req.body.heroku
  project.ghPages = req.body.ghPages

  project.save((err, saved) => {
    if (err) res.status(401).json(`Error while saving: ${err}`)
    else res.status(201).json(saved)
  })
}

let deleteProject = function (req, res) {
  Project.findOne({_id: req.params.id}, (err, project) => {
    if (err) res.status(401).json(`Error occured while finding: ${err}`)
    else {
      project.remove()
      res.status(201).json(`successfully removed document`)
    }
  })
}

module.exports = {
  postProject: postProject,
  deleteProject: deleteProject,
  getProject: getProject
}
