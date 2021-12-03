const commentsRouter = require('express').Router()

const {
  deleteComment,

  upVoteComment,
} = require('../controllers/comments.controller')

commentsRouter.route('/:comment_id').patch(upVoteComment)
commentsRouter.route('/:comment_id').delete(deleteComment)

module.exports = commentsRouter
