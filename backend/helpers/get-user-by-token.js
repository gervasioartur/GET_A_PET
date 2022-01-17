const jwt = require('jsonwebtoken')
const User = require('../models/User')

//get user by token
const getUserByToken = async (token) => {
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }
    const decoded = jwt.verify(token, 'thisisthesecreteintegraldecosxdx')
    const userId = decoded.id
    const user = await User.findOne({ _id: userId })
    return user
}

module.exports = getUserByToken