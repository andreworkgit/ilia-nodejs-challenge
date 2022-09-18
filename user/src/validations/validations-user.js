const { param, check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const { userModel } = require("../databases/mongodb/models/models-user")
const mongoose = require("mongoose")

const formatErrors = (req, res, next) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() })
    }
    next();
}

module.exports = {
    validateCreateUser: [
        check('first_name')
            .exists()
            .withMessage('first_name is required'),
        check('last_name')
            .exists()
            .withMessage('last_name is required'),
        check('email')
            .exists()
            .withMessage('email is required').
            custom(async email => {
                const exists = await userModel.exists({ email })

                if (exists) return Promise.reject('E-mail already in use')
            }),
        check('password')
            .exists()
            .withMessage('Password is required'),
        formatErrors
    ],
    validateGetUser: [
        check('id')
            .exists()
            .withMessage('id is required')
            .custom(async (id, { req }) => {
                if (!mongoose.isValidObjectId(id)) return Promise.reject('id is invalid')
            })
        ,
        formatErrors
    ],
    validateLoginUser: [
        check('password')
            .exists()
            .withMessage('password is required'),
        check('email')
            .exists()
            .withMessage('email is required')
            .custom(async (email, { req }) => {
                const user = await userModel.findOne({ email }).lean()
                const isPassCorrect = await bcrypt.compareSync(req.body.password, user.password)
                if (!isPassCorrect) return Promise.reject('Password does not match')
            })
            .withMessage('Password or email is not valid'),
        formatErrors
    ]
}

