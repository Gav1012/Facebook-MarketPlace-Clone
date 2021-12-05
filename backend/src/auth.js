// imports the db function calls
const db = require('./db');
// used for granting token to logged in user
const jwt = require('jsonwebtoken');
// used for decrypting the hashed passwords
const bcrypt = require('bcrypt');
// used in the process of giving user the token
const secrets = require('../data/secrets');

// basis of this function comes direct from example code
// provided by Professor Harrison
exports.authenticate = async (req, res) => {
  // grabs the input and destructures
  const {email, password} = req.body;
  // grabs the user from the database
  const user = await db.selectMembers(email);
  // if the user is found give token
  // checks that the user email and password match
  if (user && user[0].member.email === email &&
      bcrypt.compareSync(password, user[0].member.password)) {
        // console.log('found! email and pw match');
        // grants access token to user logging in
        const accessToken = jwt.sign(
          {email: user[0].member.email},
          secrets.accessToken, {
            expiresIn: '30m',
            algorithm: 'HS256'
          });
        // sends succesfully code
        res.status(200).json({email: email, accessToken: accessToken});
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

exports.check = (req, res, next) => {
  console.log('check start');
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, secrets.accessToken, (err, user) => {
        if (err) {
          console.log('403');
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  