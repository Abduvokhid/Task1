const mysql = require('mysql2/promise')
const config = require('config')

const db = () => {
  return mysql.createPool(config.get('db'))
}

module.exports.init = db