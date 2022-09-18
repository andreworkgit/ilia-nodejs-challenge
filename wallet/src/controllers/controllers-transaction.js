

const { userModel } = require("../databases/mongodb/models/models-user")
const { transactionModel } = require("../databases/mongodb/models/models-transaction")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/utils-jwt")

const { Request, Response } = require("express")

module.exports = {
    get2: async (req, res) => res.send('hello world'),

    get: async (req, res) => {
        try {
            const { id } = req.params
            const user = await userModel.findOne({ _id: id }).select('_id first_name last_name email')

            const bodyResponse = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
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