require('dotenv').config();
module.exports = {
    DB: {
        URL: process.env.DATABASE_URL,
        CONFIG: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
};