const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.searchListings = async (search, id) => {
  let select = 'SELECT * FROM listing';
  val = [];
  if (search) {
    console.log(search);
    select += ` WHERE LOWER(listings ->> 'title') LIKE $1`;
    const searchQuery = '%' + search + '%';
    val.push(searchQuery);
  } else if (id) {
    select += ` WHERE listing.id = $1`;
    console.log(id);
    val.push(id);
  }
  const query = {
    text: select,
    values: val,
  };
  const {rows} = await pool.query(query);
  if (rows[0] === undefined) {
    return undefined;
  }
  return rows;
};

exports.catListings = async (category, sub) => {
  if (sub !== undefined) {
    const select =
      'select * from listing where listing.categoryid in (select id from category where category.names = $1 and category.parent in (select id from category where category.names = $2))'
    const query = {
      text: select,
      values: [sub, category],
    };
    const {rows} = await pool.query(query);
    if (rows[0] === undefined) {
      return undefined;
    } else {
      return rows;
    }
  } else {
    const select = 
      'select * from listing where listing.categoryid in (select id from category where category.parent in (select id from category where category.parent is null and category.names = $1))'
      ;
    const query = {
      text: select,
      values: [category],
    }; 
    const {rows} = await pool.query(query);
    if (rows[0] === undefined) {
      return undefined;
    } else {
      return rows;
    }
  }
};

exports.getCategories = async () => {
  const select = 'select * from category';
  console.log('abc');
  const query = {
    text: select,
    values : [],
  };
  const {rows} = await pool.query(query);
  return rows;
}

