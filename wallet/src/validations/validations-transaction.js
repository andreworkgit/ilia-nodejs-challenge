const { param, check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const { transactionModel } = require("../databases/mongodb/models/models-transaction")
const mongoose = require("mongoose")


const formatErrors = (req, res, next) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() })
    }
    next();
}

module.exports = {
    validateCreateTransaction: [
        check('user_id')
            .exists()
            .withMessage('user_id is required')
            .custom(async (user_id, { req }) => {
                if (!mongoose.isValidObjectId(user_id)) return Promise.reject('user_id is invalid')
            }),
        check('amount')
            .exists()
            .withMessage('amount is required'),
        check('type')
            .exists()
            .withMessage('type is required')
            .isIn(['DEBIT', 'CREDIT'])
            .withMessage('only CREDIT or DEBIT are accepted'),
        formatErrors
    ],
    validateListTransaction: [
        check('type')
            .exists()
            .withMessage('type is required')
            .isIn(['DEBIT', 'CREDIT'])
            .withMessage('only CREDIT or DEBIT are accepted'),
        formatErrors
    ],
    validateBalanceTransaction: [
        check('user_id')
            .exists()
            .withMessage('user_id is required')
            .custom(async (user_id, { req }) => {
                const transaction = await transactionModel.findOne({ user_id }).lean()
                if (!transaction) return Promise.reject('User not found')
            }),
        formatErrors
    ]
}

