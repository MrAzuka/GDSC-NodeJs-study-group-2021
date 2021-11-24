const jwt = require('jsonwebtoken')
require('dotenv').config()
const {JWT_SECRET} = process.env

exports.requireSignIn = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const  token = authorization.split(' ')[1];

  /**
   * veify the token and verify if user is logged in in or not
   * If user is logged in then call the next() function to go to the next middleware
   */
  if(token == null){
    return res.status(401)
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403)

    req.user = user
    next()
  })
};
