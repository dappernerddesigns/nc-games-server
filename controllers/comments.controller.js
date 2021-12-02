const removeComment = require('../models/comments.model')

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params

  removeComment(comment_id).then((result) => {
    res.status(204).send({ result })
  })
}
