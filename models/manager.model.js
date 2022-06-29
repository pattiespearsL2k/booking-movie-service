const mongoose = require("mongoose");
const managerSchema = new mongoose.Schema({
    userId: {
        type: Number,
    },
    cinemaID: {
        type: String
    }
});
const Manager = mongoose.model("Manager", managerSchema, "Manager");
module.exports = {
    Manager
}