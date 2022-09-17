

const { Router } = require("express")
const { get2, userControllerCreate, userControllerLogin } = require("../controllers/controllers-user")
const { validateCreateUser, validateLoginUser } = require("../validations/validations-user")
//const { param, check, validationResult } = require("express-validator")

const router = Router()

router.route('/')
    .get(get2)
    .post(
        validateCreateUser,
        userControllerCreate
    )

router.route('/auth')
    .post(
        validateLoginUser,
        userControllerLogin
    )

module.exports.userRouters = router