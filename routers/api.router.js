const apiRouter = require('express').Router()
const categoriesRouter = require('./categories.router')
const commentsRouter = require('./comments.router')
const reviewsRouter = require('./reviews.router')
const { allEndPoints } = require('../controllers/api.controller')

apiRouter.use('/', allEndPoints)
apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/reviews', reviewsRouter)
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter
