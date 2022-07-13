const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const paymentSchema = new mongoose.Schema({
    cardCredit: {
        type: String
    },
    userAccount: {
        type: String
    },
    totalPrice: {
        type: Number
    },
    couponID: {
        type: Number
    },
    paymentDate: {
        type: Date
    },
    cvc: {
        type: Number
    },
    cardIssueDate: {
        type: String
    },
    cardName: {
        type: String
    }
});

paymentSchema.plugin(AutoIncrement, { inc_field: 'paymentId' });
const Payment = mongoose.model('Payment', paymentSchema, 'Payment');
module.exports = {
    Payment
}