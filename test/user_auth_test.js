/* globals it describe context*/
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest('http://localhost:3000')
require('dotenv').config()

describe('PUT /api/profile without credentials', () => {
  it('should return status 401', (done) => {
    api.put('/api/profile')
      .set('Accept', 'application/json')
      .send({
        name: 'Dom',
        tagline: 'This is a tagline',
        about: 'I am trying out something <br /> not sure if this works',
        contact: 'jxdlam@gmail.com',
        github: 'https://github.com/RedSwift'
      })
      .expect(401, done)
  })
  it('should not update profile', (done) => {
    api.get('/api/profile')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.eq(200)
        expect(res.body.name).to.eq('Dominic Lam')
        done()
      })
  })
})

describe('POST, DELETE, PUT /project without credentials', () => {
  context('POST /api/project', () => {
    it('should not allow post for new project', (done) => {
      api.post('/api/project')
        .set('Accept', 'application/json')
        .send({
          name: 'Bible Quiz',
          picture: 'Placeholder',
          description: 'A simple quiz game created using html, css, javascript and also jquery',
          github: 'https://github.com/RedSwift/Quiz',
          ghPages: 'http://redswift.github.io/Quiz'
        })
        .expect(401, done)
    })
  })

  context('PUT /api/project', () => {
    it('should update project in database', (done) => {
      api.put('/api/project/57a034c05fc2be055d964508')
      .set('Accept', 'application/json')
      .send({
        name: 'Just Quiz',
        picture: 'Placeholder',
        description: 'A simple quiz game created using html, css, javascript and also jquery',
        github: '123',
        ghPages: 'http://redswift.github.io/Quiz'
      })
      .expect(401, done)
    })
  })

  context('DELETE /api/project', () => {
    it('should delete project from database', (done) => {
      api.delete('/api/project/57a034c05fc2be055d964508')
        .set('Accept', 'application/json')
        .expect(401, done)
    })
  })
})

describe('POST, PUT & DELETE /skill', () => {
  context('POST /api/skill', () => {
    it('should allow post for new skill', (done) => {
      api.post('/api/skill')
        .set('Accept', 'application/json')
        .send({
          skill: 'ReactJS',
          rating: 6
        })
        .expect(401, done)
    })
  })

  context('PUT /api/skill/:id', () => {
    it('should update selected skill', (done) => {
      api.put('/api/skill/57a034c05fc2be055d96450e')
        .set('Accept', 'application/json')
        .send({
          skill: 'WeActJS',
          rating: '10'
        })
        .expect(401, done)
    })
  })

  context('DELETE /api/skill/:id', () => {
    it('should delete selected skill', (done) => {
      api.delete('/api/skill/57a034c05fc2be055d96450e')
        .set('Accept', 'application/json')
        .expect(401, done)
    })
  })
})
