const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const reviewsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
});

reviewsSchema.plugin(AutoIncrement, { inc_field: 'reviewId' });
const Reviews = mongoose.model("Reviews", reviewsSchema, "Reviews");
module.exports = {
    Reviews
}