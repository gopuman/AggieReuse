/**
* file: read.js
*/

const { pool } = require('../db/citus');

module.exports = function() {
  this.queryDatabase = async () => {
    const queryString = `
      SELECT * FROM pharmacy;
    `;

    try {
      const res = await pool.query(queryString);
      console.log(res.rows);
    } catch (err) {
      console.log(err.stack);
    } finally {
      pool.end();
    }
  };
};

// async function queryDatabase() {
//   const queryString = `
//     SELECT * FROM pharmacy;
//   `;

//   try {
//     const res = await pool.query(queryString);
//     console.log(res.rows);
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     pool.end();
//   }
// }

// queryDatabase();