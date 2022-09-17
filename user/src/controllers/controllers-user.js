const { userModel } = require("../databases/mongodb/models/models-user")
const bcrypt = require("bcryptjs")

const { Request, Response } = require("express")

module.exports = {
    get2: async (req, res) => res.send('hello world'),
    userControllerCreate: async (req, res) => {
        try {
            console.log(req.body)
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
            //console.log(user)
            return res.status(200).json({ user: bodyResponse })
        } catch (err) {
            return res.status(400).send(err.message)
        }
    },
    userControllerLogin: async (req, res) => res.send('hello world login'),
}