require('dotenv').config()
// const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const errorHandler = require('../../error/errorHandler')
const {newAccessToken, refreshAccessToken1} = require('../../utils/accessToken')

const refreshAccessToken = async (req,res) => {
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
        try {
         const {email, password} = req.body
         const foundUser = await User.findOne({email})
         if(!foundUser) {
          return res.status(401).json({message: "User not found"})
         }
         
         const isMatch = await bcrypt.compare(password, foundUser.password)
         if(!isMatch) {
           return res.status(400).json({message: "Incorrect password"})
         }
     
         const accessToken = newAccessToken(foundUser)
         const refreshToken = refreshAccessToken1(foundUser)
     
         return res.status(200).json({
           accessToken: accessToken,
           refreshToken: refreshToken
       })
        } catch (err) {
          errorHandler(err, req,res)
        }
       
};

module.exports = refreshAccessToken;
