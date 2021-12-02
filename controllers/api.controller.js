const endPoints = require('../endpoints.json')

exports.allEndPoints = (req, res, next) => {
  res.status(200).send(endPoints)
}
