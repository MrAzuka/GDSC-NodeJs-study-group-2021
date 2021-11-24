require('dotenv').config()
const jwt = require('jsonwebtoken')
const {JWT_REFRESH_SECRET, JWT_EXPIRES} = process.env
const User = require('../../models/User')

// const errorHandler = require('../../error/errorHandler')

const refreshAccessToken = async (req) => {
   const {email} = req.body
   const foundUser = await User.findOne({email})
  /**
     * Takes a parameter 
     * refreshToken 
     * in the body of the request. 
     * 
     * Take that refresh token and send a return a response with a valid access code for that user
     * 
     * response format
     * {
     *       accessToken: **********,
        refreshToken: *********
     * }
     */
    const token = jwt.sign({
      email: foundUser.email, 
      firstName: foundUser.firstName,  
      lastName: foundUser.lastName, 
      _id: foundUser._id}, JWT_REFRESH_SECRET, {expiresIn: JWT_EXPIRES})
   return token
};

module.exports = refreshAccessToken;
