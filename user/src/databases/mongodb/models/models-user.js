const { model, Schema } = require("mongoose")


const schemaUser = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date, default: Date.now
    }
})

module.exports.userModel = model('User', schemaUser)