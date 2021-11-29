const express = require('express')
const apiRouter = express.Router()
const { categoriesRouter } = require('./categories.router')

apiRouter.use('/categories', categoriesRouter)

module.exports = apiRouter
