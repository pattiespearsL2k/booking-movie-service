const {
    createPhim,
    updatePhim,
    getPhimByMaPhim,
    deletePhim,
    getDanhSachPhim
} = require('../services');
const cloudinary = require('../utils/cloudinary');
const moment = require('moment');

const themPhim = async(req, res) => {
    try {
        const phim = req.body;
        reg_ngayKhoiChieu = /^[0-3][0-9]\/[0-1][0-9]\/[0-3][0-9][0-9][0-9]$/;
        if (reg_ngayKhoiChieu.test(phim.releaseDate) !== true) {
            return res.status(400).send("Ngày chiếu không hợp lệ, Ngày chiếu phải có định dạng dd/MM/yyyy !");
        }
        const file = req.file;
        let result;
        if (file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        phim.nowShowing = Boolean(phim.nowShowing === 'true');
        phim.comingSoon = Boolean(phim.comingSoon === 'true');
        phim.image = result.secure_url || "";
        phim.rating = Number(phim.rating); 
        phim.duration = Number(phim.duration);
        const ngayKhoiChieu = moment(phim.releaseDate, "DD/MM/YYYY").toDate();
        phim.releaseDate = ngayKhoiChieu;
        const newPhim = await createPhim(phim);
        phim.movieId = newPhim.movieId;
        return res.status(200).json(phim);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const suaPhim = async(req, res) => {
    try {
        const phim = req.body;
        reg_ngayKhoiChieu = /^[0-3][0-9]\/[0-1][0-9]\/[0-3][0-9][0-9][0-9]$/;
        if (reg_ngayKhoiChieu.test(phim.releaseDate) !== true) {
            return res.status(400).send("Ngày chiếu không hợp lệ, Ngày chiếu phải có định dạng dd/MM/yyyy !");
        }
        const ngayKhoiChieu = moment(phim.releaseDate, "DD/MM/YYYY").toDate();
        phim.releaseDate = ngayKhoiChieu;
        phim.nowShowing = Boolean(phim.nowShowing === 'true');
        phim.comingSoon = Boolean(phim.comingSoon === 'true');
        //console.log(moment(phim.ngayKhoiChieu).utcOffset('+0700').format('YYYY-MM-DD HH:mm'));
        await updatePhim(phim);
        return res.status(200).json(phim);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const layThongTinPhim = async(req, res) => {
    try {
        const { movieId } = req.query;
        const phim = await getPhimByMaPhim(movieId);
        if (phim) {
            return res.status(200).json(phim);
        } else {
            return res.status(400).send("Mã phim không hợp lệ!");
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const xoaPhim = async(req, res) => {
    try {
        const { movieId } = req.query;
        const phim = await getPhimByMaPhim(movieId);
        if (phim) {
            await deletePhim(movieId);
            return res.status(200).send("Xóa thành công !");
        } else {
            return res.status(400).send("Mã phim không hợp lệ!");
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const layDanhSachPhim = async(req, res) => {
    try {
        const {title} = req.query;
        const list = await getDanhSachPhim();
        if(title){
            const array = Object.values(list).filter(item => (item.title).toLowerCase().includes(title.toLowerCase()));
            return res.status(200).json(array);
        }else{
            return res.status(200).json(list);
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

module.exports = {
    themPhim,
    suaPhim,
    layThongTinPhim,
    xoaPhim,
    layDanhSachPhim
}