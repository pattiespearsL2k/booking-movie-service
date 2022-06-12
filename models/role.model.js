const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        default: null
    }
});

roleSchema.plugin(AutoIncrement, { inc_field: 'roleId' });
const Role = mongoose.model("Role", roleSchema, "Role");
module.exports = {
    Role
}