const reviewsRouter = require('express').Router()
const {
  getReviewWithId,
  getReviews,
  patchReview,
  getReviewComments,
  addReviewComment,
} = require('../controllers/reviews.controller.js')

reviewsRouter.route('/').get(getReviews)
reviewsRouter.route('/:review_id').get(getReviewWithId)
reviewsRouter.route('/:review_id').patch(patchReview)
reviewsRouter.route('/:review_id/comments').get(getReviewComments)
reviewsRouter.route('/:review_id/comments').post(addReviewComment)

module.exports = reviewsRouter
