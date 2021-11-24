const User = require('../../models/User')
const errorHandler = require('../../error/errorHandler')
const getUserInfo = async (req, res) => {
  //gets info about the logged in user
  /**
   * return a response in the form
   * {
   *      firstName:**************,
   *      lastName: **************,
   *      email: *****************
   * }
   */
   try {
    const user = await User.find({}).select('+firstName +lastName +email');

    if (!user) {
      return res.status(404).json('No user found')
    }
    return res.status(200).json(user)
   } catch (err) {
     return errorHandler(err, req, res)
   }
  
};

module.exports = getUserInfo;
