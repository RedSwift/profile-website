var seeder = require('mongoose-seed')
require('dotenv').config()

seeder.connect(process.env.MONGODB_URI, function () {
  seeder.loadModels([
    'models/profile.js'
  ])

  seeder.clearModels(['Profile'], function () {
    seeder.populateModels(data, function () {
      console.log('its working!')
    })
  })
})

var data = [{
  'model': 'Profile',
  'documents': [{
    name: 'Dominic Lam',
    tagline: 'This is a tagline',
    about: 'I am trying out something <br /> not sure if this works',
    contact: '1234',
    github: '1234'
  }]
}]
