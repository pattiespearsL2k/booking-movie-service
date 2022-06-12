const role = require('./role.model');

const userrole = require('./user-role.model');

const user = require('./user.model');

module.exports = {
    ...role,
    ...userrole,
    ...user
}