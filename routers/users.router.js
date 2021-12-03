const usersRouter = require('express').Router()
const { getUsers, getUserDetails } = require('../controllers/users.controller')

usersRouter.route('/').get(getUsers)
usersRouter.route('/:username').get(getUserDetails)

module.exports = usersRouter
