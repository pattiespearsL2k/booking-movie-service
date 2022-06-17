const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const chairSchema = new mongoose.Schema({
    chairName: {
        type: String
    },
    roomID: {
        type: Number
    },
    typeChair: {
        type: String
    },
    stt: {
        type: String
    },
    price: {
        type: Number
    },
    booked: {
        type: Boolean,
        default: false
    },
    userAccount: {
        type: String,
        default: null
    },
    showID: {
        type: Number
    },
    roomName: {
        type: String
    }
});
chairSchema.plugin(AutoIncrement, { inc_field: 'chairID' });
const Chair = mongoose.model("Chair", chairSchema, "Chair");
module.exports = {
    Chair
}