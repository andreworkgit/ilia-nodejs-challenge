

const { Router } = require("express")
const {
    list: transactionControllerList,
    create: transactionControllerCreate
} = require("../controllers/controllers-transaction")
//const { validateCreateUser, validateLoginUser } = require("../validations/validations-user")
const passport = require('passport')

const router = Router()

router.route('/')
    .get(
        //passport.authenticate('jwt', { session: false }),
        transactionControllerList
    )
    .post(
        //validateCreateUser,
        transactionControllerCreate
    )

router.route('/balance')
    .get(
        transactionControllerList
    )

module.exports.transactionRouters = router