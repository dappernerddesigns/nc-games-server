const express = require('express')
const {
  fetchReviewWithId,
  fetchReviews,
  updateReview,
} = require('../models/reviews.model')

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

exports.patchReview = (req, res, next) => {
  console.log('In the controller')
  const { review_id } = req.params
  const votes = { inc_votes: newVote }
  updateReview(review_id, votes)
  console
    .log(votes)
    .then((response) => {
      res.status(200).send({ review: response })
    })
    .catch(next)
}
