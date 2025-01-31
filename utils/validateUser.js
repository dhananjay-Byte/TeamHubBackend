
const User = require('../models/user')

const ValidateNewUser = async (email, username) => {
    return await User.findOne({ $or: [{ email }, { username }] })
}

const ValidateExistingUser = async (user) => {
    return await User.findOne({ $or: [{ username: user }, { email: user}],isVerified:true})
}

module.exports = {ValidateNewUser,ValidateExistingUser};