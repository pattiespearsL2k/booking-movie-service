const auth = require('./auth.controller');
const role = require('./role.controller');
const user = require('./user.controller');
const movie = require('./movie.controller');
module.exports = {
    ...auth,
    ...role,
    ...user,
    ...movie
}