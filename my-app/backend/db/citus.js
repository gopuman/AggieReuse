import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  max: 300,
  connectionTimeoutMillis: 5000,
  host: '',
  port: 5432,
  user: 'citus',
  password: '',
  database: 'citus',
  ssl: true,
});
