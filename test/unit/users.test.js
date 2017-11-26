const assert = require('chai').assert
const request = require('../request')
const server = require('../request').server
const email = 'jcarlos323@hotmail.com'
var newId = 1

before(done => {  
  server.on("appStarted", function(){
    done()
  })
})

describe('POST /users', () => {
  it('creates a new user', done => {
    let user = {
	  	email
	  }
    request
      .post('/api/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(function(res) {
	    	if (res.body.status !== 'success' || res.body.data.email !== user.email) {
	    		throw new Error("Error on << POST /users >>")
        }
        newId = res.body.data.userId
	    })
      .expect(200, done)
  })
})

describe('GET /users', () => {
  it('respond with json', done => {
    request
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
	    	if (res.body.status !== 'success') {
	    		throw new Error("Error on << GET /users >>")
	    	}
	    })
      .expect(200, done)
  })
})

describe('GRAPHQL GET /users', () => {
  it('respond with json', done => {
    request
      .post('/graphql')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ query: '{ users { email } }' })
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET /users/:id', () => {
  it('gets user :id', done => {
    request
      .get(`/api/users/${newId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert(res.body.data.email, email)
        done()
      })
  })
})

describe('GRAPHQL GET /users/:id', () => {
  it('respond with json', done => {
    request
      .post('/graphql')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ query: `{ users(userId:${newId}) { email } }` })
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if (res.body.data.users[0].email !== email) {
          throw new Error("Error on << GRAPHQL GET /users/:id >>")
        }
      })
      .expect(200, done)
  })
})

describe('GRAPHQL GET /users/:prop/:value', () => {
  it('respond with json', done => {
    request
      .post('/graphql')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ query: `{ users(prop:"email" value:"${email}") { email } }` })
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if (res.body.data.users[0].email !== email) {
          throw new Error("Error on << GRAPHQL GET /users/:prop/:value >>")
        }
      })
      .expect(200, done)
  })
})

describe('PUT /users/:id', () => {
  it('updates user', done => {
    let user = {
	  	email: 'jcarlos323_2@hotmail.com'
	  }
    request
      .put(`/api/users/${newId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(function(res) {
	    	if (res.body.status !== 'success' || res.body.data.email !== user.email) {
	    		throw new Error("Error on << PUT /users/:id >>")
	    	}
	    })
      .expect(200, done)
  })
})

describe('DELETE /users/:id', () => {
  it('deletes user', done => {
    request
      .delete(`/api/users/${newId}`)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})