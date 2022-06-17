const mongoose = require("mongoose");
const cinemaChildSchema = new mongoose.Schema({
    cinemaChildID: {
        type: String
    },
    Name: {
        type: String
    },
    address: {
        type: String
    },
    listCinemaChild: {
        type: Array,
        default: []
    },
    CinemaID: {
        type: String
    }
});
const CinemaChild = mongoose.model("CinemaChild", cinemaChildSchema, "CinemaChild");
module.exports = {
    CinemaChild
}