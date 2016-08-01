/* globals it describe*/
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest('http://localhost:3000')

describe('GET /profile', (req, res) => {
  it('should return status 200', (done) => {
    api.get('/profile')
      .set('Accept', 'application/json')
      .expect(200, done)
  })
})

describe('PUT /profile', (req, res) => {
  it('should return status 201')
  it('should update profile')
})
