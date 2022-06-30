const { getListRole } = require('../services');


const getDSLoaiNguoiDung = async(req, res) => {
    try {
        const ds = await getListRole();
        return res.status(200).json(ds);
    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = {
    getDSLoaiNguoiDung,
}