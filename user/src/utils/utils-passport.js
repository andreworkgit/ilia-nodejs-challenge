const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { userModel } = require('../databases/mongodb/models/models-user')
require('dotenv').config()

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            userModel.findOne({ _id: jwt_payload._id })
                .then(user => {
                    if (user) {
                        return done(null, { _id: user._id, first_name: user.first_name, email: user.email })
                    }
                    return done(null, false)
                })
                .catch(err => console.log(err))
        })
    )
}