const { Router } = require("express")
const { userRouters } = require("./routers-user")
const { transactionRouters } = require("./routers-transaction")

const router = Router()

router.use('/users', userRouters)
router.use('/transactions', transactionRouters)


module.exports = router