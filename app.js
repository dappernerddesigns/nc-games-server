const express = require('express')
const app = express()
const apiRouter = require('./routers/api.router')
const cors = require('cors')
app.use(cors())
app.use(express.json())

const {
  handleCustomErrors,
  handlePsqlErrors,
  catchAllErrors,
  handleServerErrors,
} = require('./errors/errors')

app.use('/api', apiRouter)

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.all('/*', catchAllErrors)
app.use(handleServerErrors)

module.exports = app
