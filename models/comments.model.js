const db = require('../db/connection')

exports.removeComment = (comment_id) => {
  return db
    .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [
      comment_id,
    ])
    .then((result) => {
      return result.rows[0]
    })
}

exports.updateCommentVote = (comment_id, votes) => {
  if (votes === 0) {
    return Promise.reject({
      status: 400,
      msg: 'Invalid Input',
    })
  }
  return db
    .query(
      `UPDATE comments
    SET votes = votes + $1
    WHERE comment_id = $2
    RETURNING *;`,
      [votes, comment_id],
    )
    .then((result) => {
      return result.rows
    })
}
