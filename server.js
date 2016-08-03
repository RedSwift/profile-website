const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const profileCtrl = require('./controllers/profile')
const projectCtrl = require('./controllers/project')
const skillCtrl = require('./controllers/skill')
const userCtrl = require('./controllers/user')
require('dotenv').config()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, User-Email, Auth-Token')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
  next()
})

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

app.post('/api/login', userCtrl.signIn)

// profile
app.get('/api/profile', profileCtrl.getProfile)
app.put('/api/profile', userCtrl.userLoggedIn, profileCtrl.putProfile)

// project
app.get('/api/project', projectCtrl.getProject)
app.post('/api/project', userCtrl.userLoggedIn, projectCtrl.postProject)
app.put('/api/project/:id', userCtrl.userLoggedIn, projectCtrl.putProject)
app.delete('/api/project/:id', userCtrl.userLoggedIn, projectCtrl.deleteProject)

// skills
app.get('/api/skill', skillCtrl.getSkill)
app.post('/api/skill', userCtrl.userLoggedIn, skillCtrl.postSkill)
app.put('/api/skill/:id', userCtrl.userLoggedIn, skillCtrl.putSkill)
app.delete('/api/skill/:id', userCtrl.userLoggedIn, skillCtrl.deleteSkill)
