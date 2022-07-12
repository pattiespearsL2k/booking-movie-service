const { Coupon } = require('../models');
const { updateGhe } = require('./chair.service');
const {createPayment} = require('./payment.service')
const createVe = async (ve) => {
    let dsGhe = [];
    let giaVe = 0;
    for (let item of ve.listChair) {
        dsGhe.push({
            chairID: item.chairID
        });
        giaVe = giaVe + item.price
        await updateGhe(ve.userAccount, item.chairID);
    }
    const data = await new Coupon({
        showID: ve.showID,
        bookingDate: new Date(),
        titleMovie: ve.titleMovie,
        price: giaVe,
        listChair: dsGhe,
        userAccount: ve.userAccount
    }).save();
    await createPayment({
        userAccount: ve.userAccount,
        couponID: data.couponID,
        cardCredit: ve.cardCredit, 
        totalPrice: ve.totalPrice,
        cvc: ve.cvc,
        cardIssueDate: ve.cardIssueDate,
        cardName: ve.cardName
    });
    return data.couponID;
}

const getListVeByTaiKhoan = async (taiKhoan) => {
    const list = await Coupon.find({ userAccount: taiKhoan });
    return list;
}
const deleteCouponByShowId = async (showID) => {
    const listCoupon = await Coupon.find({ showID: showID });
    for (let item of listCoupon) {
        await Coupon.remove({ couponID: item.couponID });
    }
}
const getCouponByID = async (couponID) => {
    const dataRaw = await Coupon.aggregate([
        {
            $match: {couponID: couponID}
        },
        {
            $lookup: {
                from: "Show",
                localField: "showID",
                foreignField: "showID",
                as: "show",
                pipeline: [
                    {
                        $lookup: {
                            from: "CinemaChild",
                            localField: "cinemaChildID",
                            foreignField: "cinemaChildID",
                            as: "cinemaChild",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "Cinema",
                                        localField: "cinemaID",
                                        foreignField: "cinemaID",
                                        as: "cinema"
                                    }
                                }
                            ]
                        }
                    }
                ] 
            }
        },{
            $lookup: {
                from: "Chair",
                localField: "listChair.chairID",
                foreignField: "chairID",
                as: "chair"
            }
        },
        {
            $project: {
                "chair._id" : 0,
                "chair.chairName": 0,
                "chair.roomID": 0,
                "chair.typeChair": 0,
                "chair.stt": 0,
                "chair.price": 0,
                "chair.booked": 0,
                "chair.userAccount": 0,
                "chair.showID": 0,
                "chair.chairID": 0,
                "chair.__v": 0
            }
        }
    ]);
    const coupon = Object.values(dataRaw);
    // console.log(coupon[0].couponID);
    const data = {
        couponID: coupon[0].couponID,
        titleMovie: coupon[0].titleMovie,
        bookingDate: coupon[0].bookingDate,
        showday: coupon[0].show[0].showday,
        showtime: coupon[0].show[0].showtime,
        price: coupon[0].price,
        roomName: coupon[0].show[0].roomName,
        listChair: coupon[0].chair,
        address: coupon[0].show[0].cinemaChild[0].address,
        cinemaName: coupon[0].show[0].cinemaChild[0].cinema[0].name,
        logoCinema: coupon[0].show[0].cinemaChild[0].cinema[0].logo
    }
    return data;
}
module.exports = {
    createVe,
    getListVeByTaiKhoan,
    deleteCouponByShowId,
    getCouponByID
}