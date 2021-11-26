require('dotenv').config()
const jwt = require('jsonwebtoken')
const {JWT_REFRESH_SECRET, JWT_EXPIRES, JWT_SECRET, JWT_REFRESH_EXPIRES} = process.env
// const User = require('../../models/User')

// const errorHandler = require('../../error/errorHandler')

exports.refreshAccessToken1 =  (user) => {
    
   return jwt.sign({user}, JWT_REFRESH_SECRET, {expiresIn: JWT_REFRESH_EXPIRES})
}

exports.newAccessToken = (user) => {
   return jwt.sign({user}, JWT_SECRET, {expiresIn: JWT_EXPIRES})
}


