const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});



exports.searchListings = async () => {
  const select = 'SELECT * FROM listing';
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

exports.catListings = async (category) => {
  const select = 
  'select * from listing where listing.categoryid in (select id from category where category.parent in (select id from category where category.parent is null and category.names = $1))'
  ;
  const query = {
  text: select,
  values: [category],
   }; 
  const {rows} = await pool.query(query);
  return rows;
  };