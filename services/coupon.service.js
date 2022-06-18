const {Coupon} = require('../models');
const {updateGhe} = require('./chair.service')
const createVe = async(ve) => {
    let dsGhe = [];
    let giaVe = 0;
    for(let item of ve.listChair){
        dsGhe.push({
            chairID: item.chairID
        });
        giaVe = giaVe + item.price
        await updateGhe(ve.userAccount, item.chairID);
    }
    const data = await new Coupon({
        showID: ve.showID,
        titleMovie: ve.titleMovie,
        price: giaVe,
        listChair: dsGhe,
        userAcount: ve.userAccount
    }).save();
}

const getListVeByTaiKhoan = async(taiKhoan) => {
    const list = await Coupon.find({userAccount: taiKhoan});
    return list;
}
module.exports = {
    createVe,
    getListVeByTaiKhoan
}