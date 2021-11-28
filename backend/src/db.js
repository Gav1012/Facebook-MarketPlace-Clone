const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// gets all the listings
exports.searchListings = async (search) => {
  let select = 'SELECT * FROM listing';
  val = [];
  if (search) {
    // console.log(search);
    select += ` WHERE LOWER(listings ->> 'title') LIKE $1`;
    const searchQuery = '%' + search + '%';
    val.push(searchQuery);
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

// gets listings based on category selected
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

// gets all the categories from db
exports.getCategories = async () => {
  const select = 'select * from category';
  const query = {
    text: select,
    values : [],
  };
  const {rows} = await pool.query(query);
  return rows;
}
// gets all the members from db
exports.selectMembers = async (email) => {
  console.log('email: ', email);
  let select = ` select id, member from member`;
  if (email) {
    select += ` where member->>'email' = $1`;
  }
  const query = {
    text: select,
    values: email ? [`${email}`] : []
  };
  const {rows} = await pool.query(query);
  if (rows.length === 0) {
    return undefined;
  }
  return rows;
}
