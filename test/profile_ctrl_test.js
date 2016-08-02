/* globals it describe after*/
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest('http://localhost:3000')

describe('GET /api/profile', function () {
  it('should return status 200', function (done) {
    this.timeout(5000)
    api.get('/api/profile')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.eq(200)
        expect(res.body.name).to.be.exist
        done()
      })
  })
})

describe('PUT /api/profile', () => {
  it('should return status 201', (done) => {
    api.put('/api/profile')
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
  it('should update profile', (done) => {
    api.get('/api/profile')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.eq(200)
        expect(res.body.name).to.eq('Dom')
        done()
      })
  })
  after(function (done) {
    this.timeout = 5000
    api.put('/api/profile')
      .set('Accept', 'application/json')
      .send({
        name: 'Dominic Lam',
        tagline: 'This is a tagline',
        about: 'I am trying out something <br /> not sure if this works',
        contact: 'jxdlam@gmail.com',
        github: 'https://github.com/RedSwift'
      })
      .expect(201, done)
  })
})
