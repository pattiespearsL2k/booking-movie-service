const auth = require('./auth.controller');
const role = require('./role.controller');
const user = require('./user.controller');

module.exports = {
    ...auth,
    ...role,
    ...user
}