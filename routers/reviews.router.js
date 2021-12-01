const reviewsRouter = require('express').Router()
const {
  getReviewWithId,
  getReviews,
  patchReview,
  filterReviews,
  getReviewComments,
} = require('../controllers/reviews.controller.js')

reviewsRouter.route('/').get(getReviews)
reviewsRouter.route('/:review_id').get(getReviewWithId)
reviewsRouter.route('/:review_id').patch(patchReview)
reviewsRouter.route('/category').get(filterReviews)
reviewsRouter.route('/:review_id/comments').get(getReviewComments)

module.exports = reviewsRouter
