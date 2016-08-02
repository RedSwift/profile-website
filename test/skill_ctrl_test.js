/* globals describe context it*/
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)

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
          expect(res.body).to.eq('successfully removed document')
          done()
        })
    })
  })
})
