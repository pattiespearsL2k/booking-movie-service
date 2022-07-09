const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const couponSchema = new mongoose.Schema({
    bookingDate: {
        type: Date,
        // default: new Date()
    },
    titleMovie: {
        type: String
    },
    price: {
        type: Number
    },
    showID: {
        type: Number
    },
    userAccount: {
        type: String
    },
    listChair: {
        type: [{
            chairID: {
                type: Number
            }
        }]
    }
});
couponSchema.plugin(AutoIncrement, { inc_field: 'couponID' });
const Coupon = mongoose.model("Coupon", couponSchema, "Coupon");
module.exports = {
    Coupon
}
