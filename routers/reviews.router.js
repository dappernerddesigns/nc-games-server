const reviewsRouter = require('express').Router()
const {
  getReviewWithId,
  getReviews,
} = require('../controllers/reviews.controller.js')

reviewsRouter.route('/').get(getReviews)
reviewsRouter.route('/:review_id').get(getReviewWithId)

module.exports = reviewsRouter
