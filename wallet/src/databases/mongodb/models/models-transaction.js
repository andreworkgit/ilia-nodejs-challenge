const { model, Schema } = require("mongoose")


const schemaTransaction = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        require: true,
        enum: ["CREDIT", "DEBIT"]
    },
    createdAt: {
        type: Date, default: Date.now
    }
})

module.exports.transactionModel = model('Transaction', schemaTransaction)