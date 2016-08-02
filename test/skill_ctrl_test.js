/* globals describe context it*/
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)
const Skill = require('../models/skill')

var skillCount
Skill.count({}, (err, count) => {
  if (err) console.log(err)
  else skillCount = count
})

describe('GET /skill', () => {
  it('should allow get all skills', (done) => {
    api.get('/skill')
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(err).to.be.a.null
      expect(res.status).to.eq(200)
      expect(res.body.length).to.eq(skillCount)
      done()
    })
  })
})

describe('POST, PUT & DELETE /skill', () => {
  var id
  context('POST /skill', () => {
    it('should allow post for new skill', (done) => {
      api.post('/skill')
        .set('Accept', 'application/json')
        .send({
          skill: 'ReactJS',
          rating: 6
        })
        .end((err, res) => {
          expect(err).to.be.a.null
          id = res.body._id
          expect(res.status).to.eq(201)
          expect(res.body.skill).to.eq('ReactJS')
          expect(res.body.rating).to.eq(6)
          done()
        })
    })
  })

  context('DELETE /skill/:id', () => {
    it('should delete selected skill', (done) => {
      api.delete('/skill/' + id)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.status).to.eq(201)
          expect(res.body).to.eq('successfully removed document')
          done()
        })
    })
  })
})
