const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const refreshAccessToken = require('./refresh-token')
const {JWT_SECRET, JWT_EXPIRES} = process.env

const login = async (req, res, next) => {
  const {email, password} = req.body
  /*send a response with the following format if the login is successful
    *{
        accessToken: **********,
        refreshToken: *********
    }
    */
   try {
    const foundUser = await User.findOne({email})
    if(!foundUser) {
      res.status(401).json({message: "User not found"})
    }
    
    const isMatch = await bcrypt.compare(password, foundUser.password)
    if(!isMatch) {
      res.status(400).json({message: "Incorrect password"})
    }

    const accessToken = jwt.sign({ email: foundUser.email}, JWT_SECRET, {expiresIn: JWT_EXPIRES})
    const refreshToken = refreshAccessToken()

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken
  })
      next()
   } catch (err) {
     res.status(500).json(err)
   }
  }



module.exports = login;
