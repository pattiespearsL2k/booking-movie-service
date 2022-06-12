const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const userRoleSchema = new mongoose.Schema({
    userId: {
        type: Number,
    },
    roleId: {
        type: Number
    }
});
userRoleSchema.plugin(AutoIncrement, { inc_field: 'userRoleId' });
const UserRole = mongoose.model("UserRole", userRoleSchema, "UserRole");
module.exports = {
    UserRole
}