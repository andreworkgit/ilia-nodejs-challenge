

const { userModel } = require("../databases/mongodb/models/models-user")
const { transactionModel } = require("../databases/mongodb/models/models-transaction")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/utils-jwt")
const mongoose = require("mongoose")

module.exports = {
    balance: async (req, res) => {
        try {
            const { user_id } = req.query

            const transaction = await transactionModel.aggregate([
                {
                    $match: {
                        user_id: mongoose.Types.ObjectId(user_id)
                    }
                }, {
                    $group: {
                        _id: '$type',
                        count: { $sum: 1 },
                        totalAmount: { $sum: '$amount' }
                    }
                }
            ])

            let currentBalance = 0
            if (transaction) {

                if (transaction.length === 1) {
                    if (transaction[0]._id === 'CREDIT') {
                        currentBalance = transaction[0].totalAmount
                    } else if (transaction[0]._id === 'DEBIT') {
                        currentBalance = -Math.abs(transaction[0].totalAmount)
                    }
                } else if (transaction.length == 2) {
                    if (transaction[0].totalAmount > transaction[1].totalAmount) {
                        currentBalance = transaction[0].totalAmount - transaction[1].totalAmount
                        if (transaction[0]._id == 'DEBIT') {
                            currentBalance = -Math.abs(currentBalance)
                        }
                    } else if (transaction[0].totalAmount < transaction[1].totalAmount) {
                        currentBalance = transaction[1].totalAmount - transaction[0].totalAmount
                        if (transaction[0]._id == 'DEBIT') {
                            currentBalance = -Math.abs(currentBalance)
                        }
                    }
                }
            }

            const bodyResponse = {
                amount: currentBalance
            }

            return res.status(200).json(bodyResponse)
        } catch (err) {
            return res.status(400).send(err.message)
        }
    },
    list: async (req, res) => {
        try {
            const { type } = req.query
            console.log(type)
            const users = await transactionModel.find({ type }).select('_id user_id amount type')
            return res.status(200).json({ docs: users })
        } catch (err) {
            return res.status(400).send(err.message)
        }
    },
    create: async (req, res) => {
        try {
            const { user_id, amount, type } = req.body

            const transaction = await transactionModel.create({
                user_id,
                amount,
                type
            })

            const bodyResponse = {
                user_id: transaction.user_id,
                amount: transaction.amount,
                type: transaction.type
            }
            return res.status(200).json(bodyResponse)
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }
}