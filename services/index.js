const role = require('./role.service');
const roleUser = require('./user-role.service');

const user = require('./user.service');

const movie = require('./movie.service');

const cinema = require('./cinema.service');

const cinemaChild = require('./cinema-child.service');

const show = require('./show.service');
const chair = require('./chair.service');
module.exports = {
    ...role,
    ...roleUser,
    ...user,
    ...movie,
    ...cinema,
    ...cinemaChild,
    ...show,
    ...chair
}