const User = require('../../models/User')
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const {newAccessToken, refreshAccessToken1} = require('../../utils/accessToken')
// const {JWT_SECRET, JWT_EXPIRES, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES} = process.env

const login = async (req, res) => {
  /*send a response with the following format if the login is successful
    *{
        accessToken: **********,
        refreshToken: *********
    }
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
     res.status(500).json(err)
   }
  }



module.exports = login;
