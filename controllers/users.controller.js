const express = require('express')
const { fetchUsers, fetchUserDetails } = require('../models/users.model')

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((response) => {
      res.status(200).send({ Users: response })
    })
    .catch(next)
}

exports.getUserDetails = (req, res, next) => {
  let username = req.params.username

  fetchUserDetails(username)
    .then((response) => {
      res.status(200).send({ Users: response })
    })
    .catch(next)
}
