const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
// const refreshAccessToken = require('./refresh-token')
const {JWT_SECRET, JWT_EXPIRES, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES} = process.env

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

    const accessToken = jwt.sign({ 
      email: foundUser.email, 
      firstName: foundUser.firstName,  
      lastName: foundUser.lastName, 
      _id: foundUser._id}, 
      JWT_SECRET, 
      {expiresIn: JWT_EXPIRES})

    const refreshToken = jwt.sign({
      email: foundUser.email, 
      firstName: foundUser.firstName,  
      lastName: foundUser.lastName, 
      _id: foundUser._id}, JWT_REFRESH_SECRET, {expiresIn: JWT_REFRESH_EXPIRES})

    return res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken
  })
   } catch (err) {
     res.status(500).json(err)
   }
  }



module.exports = login;
