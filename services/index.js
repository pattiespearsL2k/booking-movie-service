const role = require('./role.service');
const roleUser = require('./user-role.service');

const user = require('./user.service');

const movie = require('./movie.service');

const cinema = require('./cinema.service');

const cinemaChild = require('./cinema-child.service');

module.exports = {
    ...role,
    ...roleUser,
    ...user,
    ...movie,
    ...cinema,
    ...cinemaChild
}