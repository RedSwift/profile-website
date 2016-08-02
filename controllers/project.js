const Project = require('../models/project.js')

let getProject = function (req, res) {
  Project.find({}, function (err, project) {
    if (err) res.status(401).json(`Error: ${err}`)
    else res.status(200).json(project)
  })
}

let postProject = function (req, res) {
  var project = new Project()

  // creating based on parameters inputted
  project.name = req.body.name
  project.picture = req.body.picture
  project.description = req.body.description
  project.github = req.body.github
  project.heroku = req.body.heroku
  project.ghPages = req.body.ghPages

  // saving created project
  project.save((err, result) => {
    if (err) res.status(401).json(`Error while saving: ${err}`)
    else res.status(201).json(result)
  })
}

let putProject = function (req, res) {
  Project.findOne({_id: req.params.id}, (err, project) => {
    if (err) res.status(401).json(`Error in finding ID: ${err}`)

    // updating if parameters found
    if (project.name) project.name = req.body.name
    if (project.picture) project.picture = req.body.picture
    if (project.description) project.description = req.body.description
    if (project.github) project.github = req.body.github
    if (project.heroku) project.heroku = req.body.heroku
    if (project.ghPages) project.ghPages = req.body.ghPages

    // saving into database
    project.save((err, result) => {
      if (err) res.status(401).json(`Error while saving: ${err}`)
      else res.status(201).json(result)
    })
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
  getProject: getProject,
  putProject: putProject
}
