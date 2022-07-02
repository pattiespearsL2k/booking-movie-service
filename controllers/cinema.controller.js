const { 
    getDanhSachHeThongRap,
    getCinemaByCinemaID,
    getCinemaIDByUserId
 } = require('../services');

const layThongTinHeThongRap = async(req, res) => {
    try {
        const list = await getDanhSachHeThongRap();
        return res.status(200).json(list);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const layThongTinHeThongRapByUserID = async(req, res) => {
    try {
        const user = req.user;
        const cinemaID = await getCinemaIDByUserId(user.id);
        const cinema = await getCinemaByCinemaID(cinemaID);
        return res.status(200).json(cinema);
    }catch(err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

module.exports = {
    layThongTinHeThongRap,
    layThongTinHeThongRapByUserID
}