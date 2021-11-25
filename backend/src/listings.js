const db = require('./db');

exports.getListings = async (req, res) => {
    //  this function can take a query later 
    //  on in the program if we need it this req.query.search
    const listings = await db.searchListings(req.query.search);
    if (listings === undefined) {
      res.status(404).send();
    } else {
      res.status(200).json(listings);
    }
  };