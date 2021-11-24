const User = require('../../models/User')

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
   const user = await User.find({}).select('firstName lastName email');

   if (!user) {
     return res.status(404).json('No user found')
   }
   return res.status(200).json(user)
  
};

module.exports = getUserInfo;
