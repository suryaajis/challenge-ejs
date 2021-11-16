const {Pool} = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'partnerChef8',
  password: 'surya123456',
  port: 5432,
})

module.exports = pool