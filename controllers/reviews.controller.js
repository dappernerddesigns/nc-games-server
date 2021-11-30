const { fetchReviewWithId, fetchReviews } = require('../models/reviews.model')

exports.getReviewWithId = (req, res, next) => {
  const { review_id } = req.params
  fetchReviewWithId(review_id)
    .then((response) => {
      res.status(200).send({ review: response })
    })
    .catch(next)
}

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((response) => {
      res.status(200).send({ reviews: response })
    })
    .catch(next)
}
