/**
* file: delete.js
*/

const { pool } = require('../db/citus');

module.exports = function() {
  this.queryDatabase = async () => {
    console.log("DELETE");
    const queryString = `
      DELETE FROM pharmacy
      WHERE pharmacy_name = 'Target';
    `;

    try {
      const result = await pool.query(queryString);
      console.log('Delete completed.');
      console.log(`Rows affected: ${result.rowCount}`);
    } catch (err) {
      console.log(err.stack);
    } finally {
      pool.end();
    }
  };
};

// async function queryDatabase() {
//   console.log("DELETE");
//   const queryString = `
//     DELETE FROM pharmacy
//     WHERE pharmacy_name = 'Target';
//   `;

//   try {
//     const result = await pool.query(queryString);
//     console.log('Delete completed.');
//     console.log(`Rows affected: ${result.rowCount}`);
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     pool.end();
//   }
// }

// queryDatabase();

// const deleteMerchant = () => {
//   return new Promise(function(resolve, reject) {
//     const id = parseInt(request.params.id)
//     pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`Merchant deleted with ID: ${id}`)
//     })
//   })
// }