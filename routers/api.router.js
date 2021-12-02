const apiRouter = require('express').Router()
const categoriesRouter = require('./categories.router')
const commentsRouter = require('./comments.router')
const reviewsRouter = require('./reviews.router')
const endPoints = require('../endpoints.json')

apiRouter.get('/', (req, res) => {
  res.status(200).send(endPoints)
})
apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/reviews', reviewsRouter)
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter
