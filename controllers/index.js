const auth = require('./auth.controller');
const role = require('./role.controller');
const user = require('./user.controller');
const movie = require('./movie.controller');

const ciname = require('./cinema.controller');
const cinemaChild = require('./cinema-child.controller');
const show = require('./show.controller');

const coupon = require('./coupon.controller');
const review = require('./review.controller');
const payment = require('./payment.controller');
module.exports = {
    ...auth,
    ...role,
    ...user,
    ...movie,
    ...ciname,
    ...cinemaChild,
    ...show,
    ...coupon,
    ...review,
    ...payment
}