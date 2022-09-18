const { Router } = require("express")
const { userRouters } = require("./routers-user")

const router = Router()

router.use('/users', userRouters)

module.exports = router