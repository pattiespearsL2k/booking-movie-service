const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const paymentSchema = new mongoose.Schema({
    cardCredit: {
        type: String
    },
    userAcount: {
        type: String
    },
    totalPrice: {
        type: Number
    },
    couponId: {
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
    }
});

paymentSchema.plugin(AutoIncrement, { inc_field: 'paymentId' });
const Payment = mongoose.model('Payment', paymentSchema, 'Payment');
module.exports = {
    Payment
}