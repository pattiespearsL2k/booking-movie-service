const role = require('./role.service');


const user = require('./user.service');

const movie = require('./movie.service');

const cinema = require('./cinema.service');

const cinemaChild = require('./cinema-child.service');

const show = require('./show.service');
const chair = require('./chair.service');
const coupon = require('./coupon.service');
const payment = require('./payment.service');

const review = require('./review.service');
module.exports = {
    ...role,
    ...user,
    ...movie,
    ...cinema,
    ...cinemaChild,
    ...show,
    ...chair,
    ...coupon,
    ...review,
    ...payment
}