/**
* file: update.js
*/

const { pool } = require('../db/citus');

modeul.exports = function() {
  this.queryDatabase = async () => {
    const queryString = `
      UPDATE pharmacy SET city = 'Long Beach'
      WHERE pharmacy_id = 1;
    `;

    try {
      const result = await pool.query(queryString);
      console.log('Update completed.');
      console.log(`Rows affected: ${result.rowCount}`);
    } catch (err) {
      console.log(err.stack);
    } finally {
      pool.end();
    }
  };
};

// async function queryDatabase() {
//   const queryString = `
//     UPDATE pharmacy SET city = 'Long Beach'
//     WHERE pharmacy_id = 1;
//   `;

//   try {
//     const result = await pool.query(queryString);
//     console.log('Update completed.');
//     console.log(`Rows affected: ${result.rowCount}`);
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     pool.end();
//   }
// }

// queryDatabase();