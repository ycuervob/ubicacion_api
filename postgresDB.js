const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  database: process.env.NAME_DB,
  password: process.env.PASS_DB,
  port: process.env.PORT_DB,
});

module.exports = pool;