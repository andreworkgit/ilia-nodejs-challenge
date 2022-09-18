
const { userModel } = require("../databases/mongodb/models/models-user")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/utils-jwt")

module.exports = {
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
            const users = await userModel.find().select('_id first_name last_name email')
            return res.status(200).json({ docs: users })
        } catch (err) {
            return res.status(400).send(err.message)
        }
    },
    create: async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body
            const hash = bcrypt.hashSync(password, 8)

            const user = await userModel.create({
                first_name,
                last_name,
                email,
                password: hash
            })

            const bodyResponse = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
            return res.status(200).json({ user: bodyResponse })
        } catch (err) {
            return res.status(400).send(err.message)
        }
    },
    login: async (req, res) => {
        try {
            const { email } = req.body

            const user = await userModel.findOne({ email })
            const token = await generateToken({ _id: user._id })

            const bodyResponse = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }

            return res.status(200).json({ user: bodyResponse, access_token: token })
        } catch (err) {
            return res.status(400).send(err.message)
        }
    },
}