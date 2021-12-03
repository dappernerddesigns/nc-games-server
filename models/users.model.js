const db = require('../db/connection')

exports.fetchUsers = () => {
  return db.query(`SELECT username FROM users;`).then((response) => {
    return response.rows
  })
}

exports.fetchUserDetails = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'User not found in database',
        })
      } else return rows
    })
}
