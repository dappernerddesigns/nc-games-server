const { showCategories } = require('../models/categories.model')

exports.getCategories = (req, res, next) => {
  showCategories()
    .then((response) => {
      res.status(200).send({ categories: response })
    })
    .catch(next)
}
