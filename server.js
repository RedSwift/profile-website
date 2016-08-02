const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const profileCtrl = require('./controllers/profile')
const projectCtrl = require('./controllers/project')
const skillCtrl = require('./controllers/skill')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/bower_components'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(morgan('dev'))

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})

// routes
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

// profile
app.get('/profile', profileCtrl.getProfile)
app.put('/profile', profileCtrl.putProfile)

// project
app.get('/project', projectCtrl.getProject)
app.post('/project', projectCtrl.postProject)
app.put('/project/:id', projectCtrl.putProject)
app.delete('/project/:id', projectCtrl.deleteProject)

// skills
app.get('/skill', skillCtrl.getSkill)
app.post('/skill', skillCtrl.postSkill)
app.delete('/skill/:id', skillCtrl.deleteSkill)
