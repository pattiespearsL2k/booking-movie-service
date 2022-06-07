const container = require('./container');
const db = require('./db');
module.exports = {
    ...container,
    ...db
}