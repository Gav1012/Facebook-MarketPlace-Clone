const db = require('./db');

exports.getListings = async (req, res) => {
    const listings = await db.searchListings(req.query.search);
    if (listings === undefined) {
      res.status(404).send();
    } else {
      res.status(200).json(lstings);
    }
  };