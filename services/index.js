const role = require('./role.service');
const roleUser = require('./user-role.service');

const user = require('./user.service');

const movie = require('./movie.service')

module.exports = {
    ...role,
    ...roleUser,
    ...user,
    ...movie
}