const { param, check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const { userModel } = require("../databases/mongodb/models/models-user")

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
    validateLoginUser: [
        check('password')
            .exists()
            .withMessage('password is required'),
        check('email')
            .exists()
            .withMessage('email is required')
            .custom(async (email, { req }) => {
                console.log(`here has `, req.body.password, email)
                const user = await userModel.findOne({ email }).lean()
                const isPassCorrect = await bcrypt.compareSync(req.body.password, user.password)
                if (!isPassCorrect) return Promise.reject('Password is not correct')
            })
            .withMessage('Password or email is not valid'),
        formatErrors
    ]
}

