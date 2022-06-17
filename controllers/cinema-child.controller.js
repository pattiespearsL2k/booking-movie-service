const { getCumRapTheoMaHeThong } = require('../services');

const layThongTinCumRapTheoHeThong = async(req, res) => {
    try {
        const { maHeThongRap } = req.query;
        const list = await getCumRapTheoMaHeThong(maHeThongRap);
        return res.status(200).json(list);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }
}

module.exports = {
    layThongTinCumRapTheoHeThong
}