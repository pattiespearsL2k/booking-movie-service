const { getDanhSachHeThongRap } = require('../services');

const layThongTinHeThongRap = async(req, res) => {
    try {
        const list = await getDanhSachHeThongRap();
        return res.status(200).json(list);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

module.exports = {
    layThongTinHeThongRap
}