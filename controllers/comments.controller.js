const { removeComment, updateCommentVote } = require('../models/comments.model')

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params

  removeComment(comment_id)
    .then((result) => {
      res.status(204).send({ result })
    })
    .catch(next)
}

exports.upVoteComment = (req, res, next) => {
  let { comment_id } = req.params
  const { inc_votes } = req.body
  updateCommentVote(comment_id, inc_votes)
    .then((response) => {
      res.status(200).send({ Comments: response })
    })
    .catch(next)
}
