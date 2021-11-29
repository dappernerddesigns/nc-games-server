const { showCategories } = require('../models/categories.model')

exports.getCategories = (req, res, next) => {
  showCategories()
    .then((response) => {
      console.log(response)
      res.status(200).send(response)
    })
    .catch(next)
}
