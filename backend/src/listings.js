const db = require('./db');

exports.getListings = async (req, res) => {
    //  this function can take a search query later 
    //  on in the program if we need it this req.query.search
    const listings = await db.searchListings(req.query.search, req.query.id);
    if (listings === undefined) {
      res.status(404).send();
    } else {
      res.status(200).json(listings);
    }
  };

exports.getCatListings = async (req, res) => {
  console.log('Were in getCatListings (inside listings)')
  console.log(req.query);
  //  this function can take a filter query later 
  //  on in the program if we need it this req.query.filter
  const listings = await db.catListings(req.params.category, req.query.sub, req.query.fil);
   
  // if it can't be found return error
  if (listings === undefined) {
    res.status(404).send();
  } else {
    res.status(200).json(listings);
  }
};

exports.getCategories = async (req, res) => {
  console.log('Were in getCategories (inside listings)')
  console.log(req.query);
  // this function gets all categories
  const categories = await db.getCategories(req.query.sub, req.query.fil);
  res.status(200).json(categories);
}

exports.getMembers = async (req, res) => {
  // checks email from input and search for user with email

  const members = await db.selectMembers(req.query.user);
  // if the member is found
  if (members) {
    res.status(200).json(members);
  } else {
    res.status(404).send();
  }
};
