const role = require('./role.service');
const roleUser = require('./user-role.service');

const user = require('./user.service');

module.exports = {
    ...role,
    ...roleUser,
    ...user
}