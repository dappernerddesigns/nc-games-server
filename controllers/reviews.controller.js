const express = require('express')
const {
  fetchReviewWithId,
  fetchReviews,
  updateReview,
  findReviews,
  fetchComments,
  writeComment,
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
  let queries = {}
  queries.sort_by = req.query.sort_by || 'created_at'
  queries.order = req.query.order || 'ASC'

  fetchReviews(queries)
    .then((response) => {
      res.status(200).send({ reviews: response })
    })
    .catch(next)
}

exports.patchReview = (req, res, next) => {
  const { review_id } = req.params
  const { inc_votes } = req.body

  updateReview(review_id, inc_votes)
    .then((response) => {
      res.status(200).send({ reviews: response })
    })
    .catch(next)
}

exports.filterReviews = (req, res, next) => {
  console.log('In the controller')
  const { category } = req.query

  findReviews(category)
    .then((response) => {
      res.status(200).send({ reviews: response })
    })
    .catch(next)
}

exports.getReviewComments = (req, res, next) => {
  const { review_id } = req.params
  fetchComments(review_id)
    .then((response) => {
      res.status(200).send({ comments: response })
    })
    .catch(next)
}
exports.postComment = (req, res, next) => {
  let { username, body } = req.body
  let { review_id } = req.params

  writeComment(username, body, review_id)
    .then((response) => {
      res.status(201).send({ comments: response })
    })
    .catch(next)
}
