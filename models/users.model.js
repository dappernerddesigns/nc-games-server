const db = require('../db/connection')

exports.fetchUsers = () => {
  return db.query(`SELECT username FROM users;`).then((response) => {
    // console.log(response.rows)
    return response.rows
  })
}
