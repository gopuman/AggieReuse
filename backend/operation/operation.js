const { pool } = require("../db/citus");

async function createTable() {
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
    } 
};

const readTable = async () => {
    const queryString = `
      SELECT * FROM pharmacy;
    `;

    try {
      const res = await pool.query(queryString);
      console.log(res.rows);
      return res.rows;
    } catch (err) {
      console.log(err.stack);
    } 
};

const deleteEntry = async (id) => {
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
    }
};

const dropTable = async () => {
  console.log("DELETE");
  const queryString = `
    DELETE FROM pharmacy
  `;

  try {
    const result = await pool.query(queryString);
    console.log('Delete completed.');
    console.log(`Rows affected: ${result.rowCount}`);
  } catch (err) {
    console.log(err.stack);
  }
};

const updateTable = async () => {
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
    }
};

module.exports = {
    createTable,
    deleteEntry,
    dropTable,
    readTable,
    updateTable
}