const User = require('.../models/User.js')
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
   */
  const {firstName, lastName, email, password, passwordConfirm} = req.body
  const user = User.findOne({email})
  if(user.email === email){
    res.status(400).json({
      message: "Email already in use"
    })
  }
  
  const newUser = new User({
    firstName, lastName, email,password, passwordConfirm
  })

  await newUser.save()

  res.status(201).json({
    message: 'Stored user details successfully',
  });
  next()
};

module.exports = signup;
