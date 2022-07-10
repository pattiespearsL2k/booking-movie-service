const role = require('./role.model');
const user = require('./user.model');
const movie = require('./movie.model');
const cinema = require('./cinema.model');;
const cinemaChild = require('./ciname-child.model');
const show = require('./show.model');
const coupon = require('./coupon.model');
const review = require('./reviews.model');
const chair = require('./chair.model');
const manager = require('./manager.model');
const payment = require('./payment.model');
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
    ...manager,
    ...payment
}