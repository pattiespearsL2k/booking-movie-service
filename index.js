const app = require('./app');

const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.DB.URL, config.DB.CONFIG)
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err));

const server = app.listen(config.port, '0.0.0.0', async() => {
    console.log('server start');
});