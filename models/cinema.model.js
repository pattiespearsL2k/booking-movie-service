const mongoose = require("mongoose");
const cinemaSchema = new mongoose.Schema({
   CinemaID: {
    type: String
   },
   Name: {
    type: String
   }
});
const Cinema = mongoose.model("Cinema", cinemaSchema, "Cinema");
module.exports = {
    Cinema
}