const cloudinary = require('cloudinary').v2;
const config = require('../config');
cloudinary.config({
    cloud_name: config.Cloudinary.CLOUD_NAME,
    api_key: config.Cloudinary.API_KEY,
    api_secret: config.Cloudinary.API_SECRET
});
module.exports = cloudinary;