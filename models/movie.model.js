const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const movieSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    duration: {
        type: Number
    },
    language: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    country: {
        type: String
    },
    genre: {
        type: String
    },
    image: {
        type: String
    },
    trailer: {
        type: String
    },
    rating: {
        type: String
    },
    nowShowing: {
        type: Boolean
    },
    comingSoon: {
        type: Boolean
    },
    listShow: {
        type: [],
        default: []
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});
movieSchema.plugin(AutoIncrement, { inc_field: 'movieId' });
movieSchema.index({ title: 'text'});
const Movie = mongoose.model("Movie", movieSchema, "Movie");
module.exports = {
    Movie
}