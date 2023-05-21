/**
* file: create.js
*/

const { pool } = require('../db/citus');

module.exports = function () {
  this.queryDatabase = async () => {
    const queryString = `
      DROP TABLE IF EXISTS pharmacy;
      CREATE TABLE pharmacy (pharmacy_id integer,pharmacy_name text,city text,state text,zip_code integer);
      INSERT INTO pharmacy (pharmacy_id,pharmacy_name,city,state,zip_code) VALUES (0,'Target','Sunnyvale','California',94001);
      INSERT INTO pharmacy (pharmacy_id,pharmacy_name,city,state,zip_code) VALUES (1,'CVS','San Francisco','California',94002);
      INSERT INTO pharmacy (pharmacy_id,pharmacy_name,city,state,zip_code) VALUES (2,'Walgreens','San Diego','California',94003);
      CREATE INDEX idx_pharmacy_id ON pharmacy(pharmacy_id);
    `;

    try {
      /* Real application code would probably request a dedicated client with
        pool.connect() and run multiple queries with the client. In this
        example, you're running only one query, so you use the pool.query()
        helper method to run it on the first available idle client.
      */

      await pool.query(queryString);
      console.log('Created the Pharmacy table and inserted rows.');
    } catch (err) {
      console.log(err.stack);
    } finally {
      pool.end();
    }
  };
};

// async function queryDatabase() {
  
// }

// queryDatabase();

// const createMerchant = (body) => {
//   return new Promise(function(resolve, reject) {
//     const { name, email } = body
//     pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`A new merchant has been added added: ${results.rows[0]}`)
//     })
//   })
// }

// module.exports = {
//   createPharmacy
// }