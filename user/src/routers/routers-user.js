const { Router } = require("express")
const {
    list: userControllerList,
    get: userControllerGet,
    create: userControllerCreate,
    login: userControllerLogin
} = require("../controllers/controllers-user")
const {
    validateCreateUser,
    validateLoginUser,
    validateGetUser
} = require("../validations/validations-user")
const passport = require('passport')

const router = Router()

router.route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        userControllerList
    )
    .post(
        validateCreateUser,
        userControllerCreate
    )

router.route('/:id')
    .get(
        passport.authenticate('jwt', { session: false }),
        validateGetUser,
        userControllerGet
    )

router.route('/auth')
    .post(
        validateLoginUser,
        userControllerLogin
    )

module.exports.userRouters = router