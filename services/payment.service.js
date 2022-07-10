const {Payment} = require('../models');

const createPayment = async (payment) => {
    payment.paymentDate = new Date();
    await new Payment(payment).save();
}
const getPayments = async () => {
    const list = await Payment.find({},{
        _id: 0,
        __v: 0
    });
    return list;
}
module.exports = {
    createPayment,
    getPayments
}