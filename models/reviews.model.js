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

exports.fetchReviews = (queries) => {
  const { sort_by, order, category } = queries

  if (
    ![
      'owner',
      'title',
      'review_id',
      'category',
      'created_at',
      'votes',
      'comment_count',
    ].includes(sort_by)
  ) {
    return Promise.reject({
      status: 400,
      msg: 'Bad request',
    })
  }
  const queryValues = []
  let queryStr = `SELECT reviews.*, COUNT(comments.review_id):: INTEGER AS comment_count
      FROM comments RIGHT JOIN reviews ON reviews.review_id = comments.review_id`

  if (category !== undefined) {
    if (
      ![
        'strategy',
        'hidden-roles',
        'dexterity',
        'push-your-luck',
        'roll-and-write',
        'deck-building',
        'engine-building',
      ].includes(category)
    ) {
      return Promise.reject({
        status: 400,
        msg: 'Bad request',
      })
    }
    queryValues.push(category)
    queryStr += ` WHERE category = $1`
  }
  queryStr += ` GROUP BY reviews.review_id
    ORDER BY ${sort_by} ${order};`

  return db.query(queryStr, queryValues).then((result) => {
    // console.log(result.rows)
    return result.rows
  })
}

exports.updateReview = (review_id, votes) => {
  if (votes === 0) {
    return Promise.reject({
      status: 400,
      msg: 'Invalid Input',
    })
  }
  return db
    .query(
      `UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *;`,
      [votes, review_id],
    )
    .then((result) => {
      return result.rows
    })
}

exports.fetchComments = (review_id) => {
  return db
    .query(
      `SELECT * FROM comments
    WHERE comments.review_id =$1`,
      [review_id],
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 400,
          msg: 'No comments found',
        })
      } else return rows
    })
}

exports.writeComment = (username, body, review_id) => {
  return db
    .query(
      `INSERT INTO comments (author, body, review_id)
  VALUES
  ($1, $2, $3)
  RETURNING *;`,
      [username, body, review_id],
    )
    .then((result) => {
      return result.rows
    })
}
