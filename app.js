const express = require('express')
const app = express()
const apiRouter = require('./routers/api.router')
app.use(express.json())

const {
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors,
} = require('./errors/errors')

app.use('/api', apiRouter)

app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.all('/*', catchAllErrors)
app.use(handleServerErrors)

module.exports = app
