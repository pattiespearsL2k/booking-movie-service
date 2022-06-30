const { Cinema } = require('../models');

const getDanhSachHeThongRap = async() => {
    const list = await Cinema.find({}, {
        _id: 0,
        __v: 0
    });
    return list;
}


module.exports = {
    getDanhSachHeThongRap
}