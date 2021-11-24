const jwt = require('jsonwebtoken')
require('dotenv').config()
const {JWT_SECRET} = process.env
const User = require('../models/User')

exports.requireSignIn = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    let  token = authorization.split(' ')[1]

    /**
     * veify the token and verify if user is logged in in or not
     * If user is logged in then call the next() function to go to the next middleware
     */
    if(token == null){
      return res.status(401).json("No token found")
    }
    const decodedToken = jwt.verify(token, JWT_SECRET)
    req.user = await User.findById(decodedToken._id).select("-password")
    next()
  } catch (err) {
    return res.status(500).json(err)
  }
};
