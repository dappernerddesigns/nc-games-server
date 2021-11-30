const { fetchReviewWithId } = require('../models/reviews.model')

exports.getReviewWithId = (req, res, next) => {
  console.log('In the controller')
  console.log(req.params)
  fetchReviewWithId()
    .then((response) => {
      res.status(200).send({ reviews: response })
    })
    .catch(next)
}
