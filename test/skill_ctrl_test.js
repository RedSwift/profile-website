/* globals describe context it*/
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)

describe('POST, PUT & DELETE /skill', () => {
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
          expect(res.body.skill).to.eq('ReactJS')
          expect(res.body.rating).to.eq(6)
          done()
        })
    })
  })
})
