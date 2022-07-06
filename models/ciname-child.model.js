const mongoose = require("mongoose");
const cinemaChildSchema = new mongoose.Schema({
    cinemaChildID: {
        type: String
    },
    cinemaChildName: {
        type: String
    },
    address: {
        type: String
    },
    listRoom: {
        type: Array,
        default: []
    },
    cinemaID: {
        type: String
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});
const CinemaChild = mongoose.model("CinemaChild", cinemaChildSchema, "CinemaChild");
module.exports = {
    CinemaChild
}