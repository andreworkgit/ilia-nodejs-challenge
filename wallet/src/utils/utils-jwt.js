
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    generateToken: async (payload) => {

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 }
        )
        return token
    }
}