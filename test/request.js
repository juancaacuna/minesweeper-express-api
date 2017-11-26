let request = require('supertest')
const server = require('../src/server')

request = request(server)

module.exports = request
module.exports.server = server