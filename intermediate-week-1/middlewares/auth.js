const jwt = require('jsonwebtoken')
require('dotenv').config()
const {JWT_SECRET} = process.env
const User = require('../models/User')
const errorHandler = require('../error/errorHandler')

exports.requireSignIn = async (req, res, next) => {
  /**
     * veify the token and verify if user is logged in in or not
     * If user is logged in then call the next() function to go to the next middleware
     */
  let token
  try {
    const authorization = req.headers.authorization;
    if (authorization && (authorization.split(' ')[0] == 'Bearer')){
       token = authorization.split(' ')[1]

      const decodedToken = jwt.verify(token, JWT_SECRET)
      req.user = await User.findById(decodedToken._id).select("-password")
      next()
    }


    if(token == null){
      return res.status(401).json("No token found")
    }
   
  } catch (err) {
    return errorHandler(err, req, res)
  }
};
