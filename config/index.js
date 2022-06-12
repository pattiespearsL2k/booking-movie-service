const container = require('./container');
const db = require('./db');
const auth = require('./auth');
module.exports = {
    ...container,
    ...db,
    ...auth
}