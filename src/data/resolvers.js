var fetch = require('node-fetch')
const models = require('../models')
const rt = require('./returnTypes')
require('dotenv').config()

const BASE_URL = `${process.env.API_URL}:${process.env.PORT}/api`

function fetchLocal(relativeURL, returnType) {
  return fetch(`${BASE_URL}${relativeURL}`)
    .then(res => res.json())
    .then(json => {
      if (returnType === rt.LIST)
        return Array.isArray(json.data) ? json.data : [json.data]
      else return json.data
    })
}

const resolvers = Object.keys(models).reduce((resolvers, key) => {
  const apiResource = models[key].table || 'undefined'
  const caller = function(returnType, id, prop, value) {
    const idURL = id ? `/${id}` : ''
    const propURL = prop && value ? `/${prop}/${value}` : ''
    return fetchLocal(`/${apiResource}${idURL}${propURL}`, returnType)
  }
  resolvers[key] = caller
  return resolvers
}, {})

module.exports = resolvers