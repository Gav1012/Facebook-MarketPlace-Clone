const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// gets all the listings
exports.searchListings = async (search, id) => {
  let select = 'SELECT * FROM listing';
  val = [];
  if (search) {
    select += ` WHERE LOWER(listings ->> 'title') LIKE $1`;
    const searchQuery = '%' + search + '%';
    val.push(searchQuery);
  } else if (id) {
    select += ` WHERE listing.id = $1`;
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

// gets listings based on category selected
exports.catListings = async (category, sub, fil) => {
  if (sub && fil) {
    const select =
      'select * from listing where listing.filterType = $1 and listing.categoryID in (select id from category where category.parent in (select id from category where category.names = $2)) intersect select * from listing where listing.categoryid in (select id from category where category.names = $3 and category.parent in (select id from category where category.names = $2))'
    const query = {
      text: select,
      values: [fil, category, sub],
    };
    const {rows} = await pool.query(query);
    if (rows[0] === undefined) {
      return undefined;
    } else {
      return rows;
    }
  }
  if (sub && !fil) {
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
    if (fil && !sub) {
      const select =
        'select * from listing where listing.filterType = $1 and listing.categoryID in (select id from category where category.parent in (select id from category where category.names = $2))'
      const query = {
        text: select,
        values: [fil, category],
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
}
};

// gets all the categories from db
exports.getCategories = async (sub, fil) => {
  if (sub) {
    const select = 'select names from category where category.parent in (select id from category where category.names = $1)';
    const query = {
      text: select,
      values : [sub],
    };
    const {rows} = await pool.query(query);
    return rows;
  } else { 
      if (fil) {
        const select = 'select names, attributes from filter where filter.parent in (select id from filter where filter.names = $1)';
        const query = {
          text: select,
          values : [fil],
        };
        const {rows} = await pool.query(query);
        return rows;  
    } else {
      const select = 'select names from category where category.parent is null';
      const query = {
        text: select,
        values : [],
      };
      const {rows} = await pool.query(query);
      return rows;
    }
  
  }
}

// gets all the members from db
exports.selectMembers = async (email, id) => {
  let select = ` select id, member from member`;
  val = [];
  if (email) {
    select += ` where member->>'email' = $1`;
    val.push(email);
  } else if (id) {
    select += ` WHERE id = $1`
    val.push(id);
  }
  const query = {
    text: select,
    values: val,
  };
  const {rows} = await pool.query(query);
  if (rows.length === 0) {
    return undefined;
  }
  return rows;
}

exports.insertMember = async (member) => {
  const insert = ` insert into member(member) values ($1) returning id`;
  const query = {
    text: insert,
    values: [member],
  };
  const {rows} = await pool.query(query);
  return {id: rows[0].id, member: member};
};

exports.postListings = async (newListing, memberID) => {
  const insert = `INSERT INTO listing(categoryid, memberid, filterType, listings) values ($1, $2, $3, $4)`;
  const select = `SELECT id FROM category WHERE names LIKE $1`;
  const like = newListing['category'];
  const querySelect = {
    text: select,
    values: [like],
  };
  let catID = await pool.query(querySelect);
  if (catID['rows'].length === 0) {
    return undefined;
  }
  catID = catID['rows'][0]['id'];
  const date = new Date();
  const monthName = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthName[date.getMonth()];
  const year = date.getFullYear();
  const dateNum = date.getDate();
  const dateString = month + ' ' + dateNum + ', ' + year;
  newListing['listing']['createDate'] = dateString;
  const query = {
    text: insert,
    values: [catID, memberID, newListing['filter'], newListing['listing']],
  };
  const {rows} = await pool.query(query);
  return rows;
}
