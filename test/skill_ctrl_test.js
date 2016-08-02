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

describe('GET /api/skill', () => {
  it('should allow get all skills', (done) => {
    api.get('/api/skill')
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
  context('POST /api/skill', () => {
    it('should allow post for new skill', (done) => {
      api.post('/api/skill')
        .set('Accept', 'application/json')
        .set('User-Email', process.env.EMAIL)
        .set('Auth-Token', process.env.AUTHTOKEN)
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

  context('PUT /api/skill/:id', () => {
    it('should update selected skill', (done) => {
      api.put('/api/skill/' + id)
        .set('Accept', 'application/json')
        .set('User-Email', process.env.EMAIL)
        .set('Auth-Token', process.env.AUTHTOKEN)
        .send({
          skill: 'WeActJS',
          rating: '10'
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.status).to.eq(201)
          expect(res.body.skill).to.eq('WeActJS')
          expect(res.body.rating).to.eq(10)
          done()
        })
    })
  })

  context('DELETE /api/skill/:id', () => {
    it('should delete selected skill', (done) => {
      api.delete('/api/skill/' + id)
        .set('Accept', 'application/json')
        .set('User-Email', process.env.EMAIL)
        .set('Auth-Token', process.env.AUTHTOKEN)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.status).to.eq(201)
          expect(res.body).to.eq('successfully removed document')
          done()
        })
    })
  })
})
