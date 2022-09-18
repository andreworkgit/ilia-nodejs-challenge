const { Router } = require("express")
const {
    balance: transactionControllerBalance,
    list: transactionControllerList,
    create: transactionControllerCreate
} = require("../controllers/controllers-transaction")
const {
    validateCreateTransaction,
    validateListTransaction,
    validateBalanceTransaction
} = require("../validations/validations-transaction")
const passport = require('passport')

const router = Router()

router.route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        validateListTransaction,
        transactionControllerList
    )
    .post(
        passport.authenticate('jwt', { session: false }),
        validateCreateTransaction,
        transactionControllerCreate
    )

router.route('/balance')
    .get(
        passport.authenticate('jwt', { session: false }),
        validateBalanceTransaction,
        transactionControllerBalance
    )

module.exports.transactionRouters = router