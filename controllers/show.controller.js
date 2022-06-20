const {
    createLichChieu,
    getThongTinLichChieuTheoHeThongRap,
    getTenRapByMaRap,
    createDanhSachGhe,
    getDanhSachPhongVe,
    getDanhSachHeThongRapByMaPhim,
    getPhimByMaPhim,
    getShowByMaRapAndDate
} = require('../services');
const moment = require('moment');

const taoLichChieu = async(req, res) => {
    try {
        const lichChieu = req.body;
        lichChieu.movieId = Number(lichChieu.movieId);
        lichChieu.roomID = Number(lichChieu.roomID);
        lichChieu.price = Number(lichChieu.price);
        const data = await getTenRapByMaRap(lichChieu.roomID);
        lichChieu.roomName = data.roomName;
        lichChieu.cinemaChildID = data.cinemaChildID;
        reg_showtime = /^([0-9][0-9]\/){2}[0-9][0-9][0-9][0-9] ([0-9][0-9]:){2}[0-1][0-9]$/;
        if (reg_showtime.test(lichChieu.showtime) !== true) {
            return res.status(400).send("Ngày chiếu giờ chiếu không hợp lệ, Ngày chiếu phải có định dạng dd/MM/yyyy hh:mm:ss !");
        }
        if (lichChieu.price < 75000 || lichChieu.price > 200000) {
            return res.status(400).send("Giá từ 75.000 - 200.000");
        }
        lichChieu.showtime = moment(lichChieu.showtime, "DD/MM/YYYY HH:mm:ss").toDate();
        const show = getShowByMaRapAndDate(lichChieu.roomID, lichChieu.showtime);
        if(show){
            return res.status(400).send("Rạp đã được xếp lịch chiếu vào giờ đã nhập!");
        }
        const newLichChieu = await createLichChieu(lichChieu);
        lichChieu.showID = newLichChieu.showID;
        await createDanhSachGhe(newLichChieu.showID, lichChieu.price, lichChieu.roomID, lichChieu.roomName);
        return res.status(200).json(lichChieu);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }
}

const layThongTinLichChieuHeThongRap = async(req, res) => {
    try {
        const list = await getThongTinLichChieuTheoHeThongRap();
        for (let heThong of list) {
            for (let cum of heThong.lstCinemaChild) {
                for (let phim of cum.listMovie) {
                    const array = Object.values(phim.lstShowFlowMovie).filter(item => item.cinemaChildID === cum.cinemaChildID);
                    array.forEach(item => {
                        delete item.cinemaChildID;
                    })
                    phim.lstShowFlowMovie = array;
                }
            }
        }
        return res.status(200).json(list);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }
}
const layDanhSachPhongVe = async(req, res) => {
    try {
        const {showID} = req.query;
        const list = await getDanhSachPhongVe(Number(showID));
        return res.status(200).json(list);
    }catch(err){
        console.log(err);
        return res.status(600).json(err);
    }
}
const layThongTinLichChieuPhim = async(req, res) => {
    try {
        const {movieId} = req.query;
        const list = await getDanhSachHeThongRapByMaPhim(Number(movieId));
        const phim = await getPhimByMaPhim(Number(movieId));
        const data = {
            movieId: phim.movieId,
            title: phim.title,
            trailer: phim.trailer,
            image: phim.image,
            description: phim.description,
            releaseDate: phim.releaseDate,
            rating: phim.rating,
            cinema: list
        }
        return res.status(200).json(data);
    }catch(err) {
        console.log(err);
        return res.status(600).json(err);
    }
}
module.exports = {
    taoLichChieu,
    layThongTinLichChieuHeThongRap,
    layDanhSachPhongVe,
    layThongTinLichChieuPhim
}