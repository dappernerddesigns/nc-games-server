const db = require('../db/connection')

exports.fetchReviewWithId = () => {
  console.log('In the model')
  return db
    .query(`SELECT * FROM reviews WHERE review_id=$1;`, [review_id])
    .then((result) => {
      return result.rows[0]
    })
}
