const { Role } = require('../models');

const getListRole = async() => {
    const list = await Role.find({}, {
        _id: 0,
        __v: 0
    });
    return list;
}

const getRoleByRoleId = async(roleId) => {
    const role = await Role.findOne({ roleId: roleId });
    return role.roleName;
}

module.exports = {
    getListRole,
    getRoleByRoleId
}