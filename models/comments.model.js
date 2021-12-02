const db = require('../db/connection')

exports.removeComment = (comment_id) => {
  console.log('In the model')
  return db
    .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [
      comment_id,
    ])
    .then((result) => {
      return result.rows[0]
    })
}
