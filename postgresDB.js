const { Pool } = require('pg');
require('dotenv').config();

const client = {
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.NAME_DB,
    password: process.env.PASS_DB,
    port: process.env.PORT_DB,
    ssl:{
        rejectUnauthorized:false,
    }
};

const pool = new Pool(client);

module.exports = pool;