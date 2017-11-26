const assert = require('chai').assert
const request = require('../request')
const server = require('../request').server
const level = '21'
var newId = 1

describe('POST /records', () => {
  it('creates a new record', done => {
    let record = {
      level,
      seconds: 0
	  }
    request
      .post('/api/records')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(record)
      .expect('Content-Type', /json/)
      .expect(function(res) {
	    	if (res.body.status !== 'success' || res.body.data.level !== record.level) {
	    		throw new Error("Error on << POST /records >>")
        }
        newId = res.body.data.recordId
	    })
      .expect(200, done)
  })
})

describe('GET /records', () => {
  it('respond with json', done => {
    request
      .get('/api/records')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
	    	if (res.body.status !== 'success') {
	    		throw new Error("Error on << GET /records >>")
	    	}
	    })
      .expect(200, done)
  })
})

describe('GRAPHQL GET /records', () => {
  it('respond with json', done => {
    request
      .post('/graphql')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ query: '{ records { level } }' })
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET /records/:id', () => {
  it('gets record 1', done => {
    request
      .get(`/api/records/${newId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert(res.body.data.level, level)
        done()
      })
  })
})

describe('GET /records/:prop/:value', () => {
  it('gets record 1', done => {
    request
      .get(`/api/records/level/${level}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert(res.body.data.level, level)
        done()
      })
  })
})

describe('GRAPHQL GET /records/:id', () => {
  it('respond with json', done => {
    request
      .post('/graphql')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ query: `{ records(recordId:${newId}) { level } }` })
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if (res.body.data.records[0].level !== parseInt(level)) {
          throw new Error("Error on << GRAPHQL GET /records/:id >>")
        }
      })
      .expect(200, done)
  })
})

describe('GRAPHQL GET /records/:prop/:value', () => {
  it('respond with json', done => {
    request
      .post('/graphql')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ query: `{ records(prop:"level" value:"${level}") { level seconds } }` })
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if (res.body.data.records[0].level !== parseInt(level)) {
          throw new Error("Error on << GRAPHQL GET /records/:prop/:value >>")
        }
      })
      .expect(200, done)
  })
})

describe(`PUT /records/:id`, () => {
  it(`updates record`, done => {
    let record = {
	  	level: '60'
	  }
    request
      .put(`/api/records/${newId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(record)
      .expect('Content-Type', /json/)
      .expect(function(res) {
	    	if (res.body.status !== 'success' || res.body.data.email !== record.email) {
	    		throw new Error("Error on << PUT /records/:id >>")
	    	}
	    })
      .expect(200, done)
  })
})

describe(`DELETE /records/:id`, () => {
  it(`deletes record`, done => {
    request
      .delete(`/api/records/${newId}`)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})