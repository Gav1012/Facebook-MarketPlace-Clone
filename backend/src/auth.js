const db = require('./db');

// const jwt = require('jsonwebtoken');
// var bcrypt = require('bcrypt');

const secrets = require('../data/secrets');

exports.authenticate = async (req, res) => {
  const {email, password} = req.body;
  const user = await db.selectMembers(email);
  if (user) {
    if (user[0].member.email === email &&
        user[0].member.password === password) {
            console.log('found!');
    }
    //   const accessToken = jwt.sign(
    //     {email: user.email}, 
    //     secrets.accessToken, {
    //       expiresIn: '30m',
    //       algorithm: 'HS256'
    //     });
    //   res.status(200).json({name: user.name, accessToken: accessToken});
    res.status(200).json({email: email, password: password})
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

// exports.check = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//       const token = authHeader.split(' ')[1];
//       jwt.verify(token, secrets.accessToken, (err, user) => {
//         if (err) {
//           return res.sendStatus(403);
//         }
//         req.user = user;
//         next();
//       });
//     } else {
//       res.sendStatus(401);
//     }
//   };
  