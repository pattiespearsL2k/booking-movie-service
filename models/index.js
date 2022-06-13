const role = require('./role.model');

const userrole = require('./user-role.model');

const user = require('./user.model');
const movie = require('./movie.model');

module.exports = {
    ...role,
    ...userrole,
    ...user,
    ...movie
}