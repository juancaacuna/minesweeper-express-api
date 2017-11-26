const express = require('express')
const Entities = require('./controllers/defaultEntity')
const models = require('./models')

const Queries = function(db) {
  this.db = db
}

Queries.prototype.getRouter = function() {
  let router = express.Router()

  Object.keys(models).forEach(key => {
    if (this.db[key] && models[key]) {
      const entities = new Entities(this.db[key], models[key])
      const apiResource = models[key].table || 'undefined'
      router = setRoutsForEntity(router, apiResource.toLowerCase(), entities)
    }
  })

  return router
}

function setRoutsForEntity(router, apiResourceName, entity) {
  const name = apiResourceName
  const prefix = '/api/'

  router.get(`${prefix}${name}`, entity.get.bind(entity))
  router.get(`${prefix}${name}/:id`, entity.getById.bind(entity))
  router.get(`${prefix}${name}/:prop/:value`, entity.getByProperty.bind(entity))
  router.post(`${prefix}${name}`, entity.insert.bind(entity))
  router.put(`${prefix}${name}/:id`,  entity.update.bind(entity))
  router.delete(`${prefix}${name}/:id`,  entity.delete.bind(entity))

  return router
}

module.exports = Queries
