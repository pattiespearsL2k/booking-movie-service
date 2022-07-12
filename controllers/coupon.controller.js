const {
    createVe,
    getPhimByMaLichChieu,
    getCouponByID
} = require('../services');

const datVe = async(req, res) => {
    try{
        let ve = req.body;
        // get phim when send req showID.
        const phim = await getPhimByMaLichChieu(Number(ve.showID));
        const user = req.user;
        ve.userAccount = user.username;
        ve.titleMovie = phim.title;
        const couponID = await createVe(ve);
        return res.status(200).json({
            couponID: couponID,
            message: "Đặt vé thành công!"
        })
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
const getDetailCoupon = async(req, res) => {
    try {
        const {couponID} = req.query;
        const coupon = await getCouponByID(Number(couponID));
        return res.status(200).json(coupon);
    }catch(err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

module.exports = {
    datVe,
    getDetailCoupon
}