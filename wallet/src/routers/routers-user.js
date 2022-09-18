const { Router } = require("express")
const {
    list: userControllerList,
    get: userControllerGet,
    create: userControllerCreate,
    login: userControllerLogin
} = require("../controllers/controllers-user")
const { validateCreateUser, validateLoginUser } = require("../validations/validations-user")
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
        userControllerGet
    )

router.route('/auth')
    .post(
        validateLoginUser,
        userControllerLogin
    )

module.exports.userRouters = router