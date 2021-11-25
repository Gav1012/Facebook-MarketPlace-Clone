const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});



exports.searchListings = async () => {
  const select = 'SELECT * FROM listings';
  const query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);
  if (rows[0] === undefined) {
    return undefined;
  }
  return rows;
};

exports.pullCategories = async (category) => {

  const select = 'SELECT * FROM listings';
  const query = {
  text: select,
  values: [],
   }; 
  const {rows} = await pool.query(query);
  return rows;
  };