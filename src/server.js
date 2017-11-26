const promise = require('bluebird')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
var graphqlHTTP = require('express-graphql')
const http = require('http')
const massive = require('massive')
const schema = require('./data/schema.js')
const Queries = require('./queries')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  graphiql: true,
}))

massive(
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.POSTGRES_HOST !== '0.0.0.0',
  }, {},
  {
    promiseLib: promise
  }
).then(db => {
  appInit(db)
})

function appInit (db) {
  app.set('db', db)
  const queries = new Queries(db)
  app.use('/', queries.getRouter())

  // development error handler
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status( err.code || 500 )
      .json({
        status: 'error',
        message: err
      })
    })
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
      status: 'error',
      message: err.message
    })
  })

  console.log(`Listening on http://localhost:${process.env.PORT}`)
  http.createServer(app).listen(process.env.PORT)
  app.emit("appStarted")
}

module.exports = app