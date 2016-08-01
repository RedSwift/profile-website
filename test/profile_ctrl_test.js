/* globals it describe*/
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest('http://localhost:3000')

describe('GET /profile', (req, res) => {
  it('should return status 200', function (done) {
    this.timeout = 5000
    api.get('/profile')
      .set('Accept', 'application/json')
      .expect(200, done)
  })
})

describe('PUT /profile', (req, res) => {
  it('should return status 201', (done) => {
    api.put('/profile')
      .set('Accept', 'application/json')
      .send({
        name: 'Dom',
        tagline: 'This is a tagline',
        about: 'I am trying out something <br /> not sure if this works',
        contact: 'jxdlam@gmail.com',
        github: 'https://github.com/RedSwift'
      })
      .expect(201, done)
  })
  it('should update profile')
})
