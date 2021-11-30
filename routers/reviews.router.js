const reviewsRouter = require('express').Router()
const { getReviewWithId } = require('../controllers/reviews.controller.js')

reviewsRouter.route('/').get(getReviewWithId)

module.exports = reviewsRouter
