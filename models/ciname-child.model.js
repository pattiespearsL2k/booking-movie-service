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
    listRow: {
        type: Array,
        default: []
    },
    cinemaID: {
        type: String
    }
});
const CinemaChild = mongoose.model("CinemaChild", cinemaChildSchema, "CinemaChild");
module.exports = {
    CinemaChild
}