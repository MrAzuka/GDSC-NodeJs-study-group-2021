const User = require('.../models/User.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

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

    jwt.sign({ email: 
      foundUser.email}, JWT_SECRET, {expiresIn: JWT_EXPIRES}, (err, token) => {
        res.status(201).json({accessToken: token})
      })

    
      next()
   } catch (err) {
     res.status(500).json(err)
   }
  }



module.exports = login;
