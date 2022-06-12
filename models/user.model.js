const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String,
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    }
});
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });
userSchema.index({ username: 'text', email: 'text', phoneNumber: 'text', name: 'text' });
const User = mongoose.model("User", userSchema, "User");
module.exports = {
    User
}