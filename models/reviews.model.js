const db = require('../db/connection')

exports.fetchReviewWithId = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id=$1;`, [review_id])
    .then((result) => {
      // ;[review] = result.rows
      console.log(result.rows)
      return [result.rows[0]]
    })
}

exports.fetchReviews = () => {
  return db.query(`SELECT * FROM reviews;`).then((result) => {
    return result.rows
  })
}
