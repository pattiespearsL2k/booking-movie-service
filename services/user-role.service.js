const { UserRole } = require('../models');
const { getRoleByRoleId } = require('./role.service')
const createRoleUser = async(user_id, role_id) => {
    const roleUser = await new UserRole({
        userId: user_id,
        roleId: role_id
    }).save();
    return roleUser;
}
const getNameRoleByUserId = async(user_id) => {
    const userRole = await UserRole.findOne({ userId: user_id });
    const name = await getRoleByRoleId(userRole.roleId);
    return name;
}
module.exports = {
    createRoleUser,
    getNameRoleByUserId
}