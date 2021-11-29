const { Pool } = require('pg')
const ENV = process.env.NODE_ENV || 'dev'

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
})
console.log(`**Running in ${ENV} ENV**`)

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set')
}

module.exports = new Pool()
