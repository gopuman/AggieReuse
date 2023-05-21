const { Pool } = require('pg');

const pool = new Pool({
  max: 300,
  connectionTimeoutMillis: 5000,

  host: 'c.hackdavis.postgres.database.azure.com',
  port: 5432,
  user: '',
  password: '',
  database: '',
  ssl: true,
});

module.exports = {
    pool
};
