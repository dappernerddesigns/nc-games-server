const express = require('express')
const { fetchUsers } = require('../models/users.model')
exports.getUsers = (req, res, next) => {
  fetchUsers().then((response) => {
    res.status(200).send({ Users: response })
  })
}
