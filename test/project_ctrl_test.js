/* globals describe context it*/
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)

describe('POST & DELETE /project', () => {
  var id
  context('POST /project', () => {
    it('should allow post for new project', (done) => {
      api.post('/project')
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
          id = res.body._id
          done()
        })
    })
  })

  context('DELETE /project', () => {
    it('should delete project from database', (done) => {
      api.delete('/project/' + id)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body).to.eq('successfully removed document')
          done()
        })
    })
  })
})
