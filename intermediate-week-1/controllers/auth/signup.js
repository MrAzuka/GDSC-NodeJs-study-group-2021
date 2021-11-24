const User = require('../../models/User')
const errorHandler = require('../../error/errorHandler')
const signup = async (req, res, next) => {
  /**
   * takes the following fields in the body
   *
   * firstName
   * lastName
   * email
   * password
   * passwordConfirm
   *
   * and saves it to the MongoDB database
   *
//    */
 try {
  const {firstName, lastName, email, password, passwordConfirm} = req.body
  const oldUser = await User.findOne({ email })
  
  if(oldUser){
   return res.send({
      message: "Email already in use"
    })
  }
  
  const newUser = new User({
    firstName, lastName, email, password, passwordConfirm
  })

  const createdUser = await newUser.save()

  if (!createdUser) {
    return res.status(401).json("User not created")
  } else {
    return res.status(201).json({
      message: 'Stored user successfully',
    }) 
  }
  
 } catch (err) {
  return errorHandler(err, req, res, next)
 }
};

module.exports = signup;
