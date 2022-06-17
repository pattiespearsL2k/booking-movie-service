const role = require('./role.model');

const userrole = require('./user-role.model');

const user = require('./user.model');
const movie = require('./movie.model');
const cinema = require('./cinema.model');;
const cinemaChild = require('./ciname-child.model');
const show = require('./show.model');

const chair = require('./chair.model');
module.exports = {
    ...role,
    ...userrole,
    ...user,
    ...movie,
    ...cinema,
    ...cinemaChild,
    ...show,
    ...chair
}