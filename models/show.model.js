const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const showSchema = new mongoose.Schema({
    movieId: {
        type: Number
    },
    showtime: {
        type: Date
    },
    roomID: {
        type: Number
    },
    roomName: {
        type: String
    },
    price: {
        type: Number
    },
    cinemaChildID: {
        type: String
    }
});
showSchema.plugin(AutoIncrement, { inc_field: 'showID' });
const Show = mongoose.model("Show", showSchema, "Show");
module.exports = {
    Show
}