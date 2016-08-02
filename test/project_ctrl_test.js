/* globals describe context it*/
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)
const Project = require('../models/project.js')

var projectCount
Project.count({}, function (err, count) {
  if (err) console.log(err)
  else projectCount = count
})

describe('GET /api/project', () => {
  it('should get all projects from the database', function (done) {
    api.get('/api/project')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.eq(200)
        expect(res.body.length).to.eq(projectCount)
        done()
      })
  })
})

describe('POST, DELETE, PUT /project', () => {
  var id
  context('POST /api/project', () => {
    it('should allow post for new project', (done) => {
      api.post('/api/project')
        .set('Accept', 'application/json')
        .send({
          name: 'Bible Quiz',
          picture: 'Placeholder',
          description: 'A simple quiz game created using html, css, javascript and also jquery',
          github: 'https://github.com/RedSwift/Quiz',
          ghPages: 'http://redswift.github.io/Quiz'
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body.name).to.eq('Bible Quiz')
          expect(res.status).to.eq(201)
          id = res.body._id
          done()
        })
    })
  })

  context('PUT /api/project', () => {
    it('should update project in database', (done) => {
      api.put('/api/project/' + id)
      .set('Accept', 'application/json')
      .send({
        name: 'Just Quiz',
        picture: 'Placeholder',
        description: 'A simple quiz game created using html, css, javascript and also jquery',
        github: '123',
        ghPages: 'http://redswift.github.io/Quiz'
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.body.name).to.eq('Just Quiz')
        expect(res.body.github).to.eq('123')
        expect(res.body.picture).to.eq('Placeholder')
        expect(res.status).to.eq(201)
        done()
      })
    })
  })

  context('DELETE /api/project', () => {
    it('should delete project from database', (done) => {
      api.delete('/api/project/' + id)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body).to.eq('successfully removed document')
          expect(res.status).to.eq(201)
          done()
        })
    })
  })
})
