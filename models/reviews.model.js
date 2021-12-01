const db = require('../db/connection')

exports.fetchReviewWithId = (review_id) => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments.review_id):: INTEGER AS comment_count
      FROM comments RIGHT JOIN reviews ON reviews.review_id = comments.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id;`,
      [review_id],
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'Game not found in database',
        })
      } else return rows
    })
}

exports.fetchReviews = () => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments.review_id):: INTEGER AS comment_count
      FROM comments RIGHT JOIN reviews ON reviews.review_id = comments.review_id    
      GROUP BY reviews.review_id
      ;`,
    )
    .then((result) => {
      return result.rows
    })
}

exports.updateReview = (review_id, votes) => {
  console.log('In the model>>>>')

  return db
    .query(
      `UPDATE reviews
    SET votes = $1
    WHERE review_id = $2
    RETURNING *;`,
      [votes, review_id],
    )
    .then((result) => {
      console.log(result.rows)
      return result.rows
    })
}
