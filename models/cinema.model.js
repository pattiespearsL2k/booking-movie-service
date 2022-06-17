const mongoose = require("mongoose");
const cinemaSchema = new mongoose.Schema({
   cinemaID: {
    type: String
   },
   name: {
    type: String
   },
   logo: {
    type: String
   },
   aliases: {
    type: String
   }
});
const Cinema = mongoose.model("Cinema", cinemaSchema, "Cinema");
module.exports = {
    Cinema
}