const {
    createLichChieu,
    getThongTinLichChieuTheoHeThongRap,
    getTenRapByMaRap,
    createDanhSachGhe,
    getDanhSachPhongVe,
    getDanhSachHeThongRapByMaPhim,
    getPhimByMaPhim,
    getShowByMaRapAndDate,
    deleteShowById,
    getCinemaIDByUserId,
    getCinemaIDByRoomID,
    getShowByShowID,
    getShowByDate,
    updateListShowByShowID,
    deleteCouponByShowId
} = require('../services');
const moment = require('moment');
const taoLichChieu = async (req, res) => {
    try {
        const lichChieu = req.body;
        lichChieu.movieId = Number(lichChieu.movieId);
        lichChieu.roomID = Number(lichChieu.roomID);
        lichChieu.price = Number(lichChieu.price);
        const user = req.user;
        if (user.role !== 'admin') {
            const cinemaID_1 = await getCinemaIDByUserId(user.id);
            const cinemaID_2 = await getCinemaIDByRoomID(lichChieu.roomID);
            if (cinemaID_1 !== cinemaID_2) {
                return res.status(400).send("Bạn không có quyền!");
            }
        }
        const data = await getTenRapByMaRap(lichChieu.roomID);
        lichChieu.roomName = data.roomName;
        lichChieu.cinemaChildID = data.cinemaChildID;
        reg_showday = /^([0-9][0-9]\/){2}[0-9][0-9][0-9][0-9]$/;
        reg_showTime = /^([0-9][0-9]:){2}[0-1][0-9]$/;
        if (reg_showTime.test(lichChieu.showtime) !== true) {
            return res.status(400).send("Giờ chiếu không hợp lệ,giờ chiếu phải có định dạng hh:mm:ss!");
        }
        if (reg_showday.test(lichChieu.showday) !== true) {
            return res.status(400).send("Ngày chiếu không hợp lệ, Ngày chiếu phải có định dạng dd/MM/yyyy!");
        }
        const date = lichChieu.showday + " " + lichChieu.showtime;
        const dateShow = moment(date, 'DD/MM/YYYY hh:mm:ss');
        const nowDate = new Date();
        if (dateShow < nowDate) {
            return res.status(400).send("ngày đặt lịch không hợp lệ!");
        }
        if (lichChieu.price < 75000 || lichChieu.price > 200000) {
            return res.status(400).send("Giá từ 75.000 - 200.000");
        }
        const show = await getShowByMaRapAndDate(lichChieu.roomID, lichChieu.showtime, lichChieu.showday);
        if (show) {
            return res.status(400).send("Rạp đã được xếp lịch chiếu vào giờ đã nhập!");
        }
        const newLichChieu = await createLichChieu(lichChieu);
        lichChieu.showID = newLichChieu.showID;
        await createDanhSachGhe(newLichChieu.showID, lichChieu.price, lichChieu.roomID, lichChieu.roomName);
        return res.status(200).json(lichChieu);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const layThongTinLichChieuHeThongRap = async (req, res) => {
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
        return res.status(400).json(err);
    }
}
const layThongTinLichChieuHeThongRapByShowDay = async(req, res) => {
    try {
        const {showday} = req.query;
        const list = await getShowByDate(showday, null);
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
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
const layThongTinLichChieuHeThongRapByShowDayAndManagerCinema = async(req, res) => {
    try {
        const user = req.user;
        const cinemaID = await getCinemaIDByUserId(user.id);
        const {showday} = req.query;
        const list = await getShowByDate(showday, cinemaID);
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
    }catch(err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const layDanhSachPhongVe = async(req, res) => {
    try {
        const { showID } = req.query;
        const list = await getDanhSachPhongVe(Number(showID));
        return res.status(200).json(list);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const layThongTinLichChieuPhim = async (req, res) => {
    try {
        const { movieId } = req.query;
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
            duration: phim.duration,
            country: phim.country,
            genre: phim.genre,
            nowShowing: phim.nowShowing,
            comingSoon: phim.comingSoon,
            cinema: list
        }
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const deleteShow = async (req, res) => {
    try {
        let { showID } = req.query;
        showID = Number(showID);
        const user = req.user;
        if (user.role !== 'admin') {
            const cinemaID_1 = await getCinemaIDByUserId(user.id);
            const roomID = (await getShowByShowID(showID)).roomID;
            const cinemaID_2 = await getCinemaIDByRoomID(roomID);
            if (cinemaID_1 !== cinemaID_2) {
                return res.status(400).send("Bạn không có quyền!");
            }
        }
        await deleteShowById(showID);
        await updateListShowByShowID(showID);
        await deleteCouponByShowId(showID);
        return res.status(200).send("Xóa thành công!");
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
module.exports = {
    taoLichChieu,
    layThongTinLichChieuHeThongRap,
    layDanhSachPhongVe,
    layThongTinLichChieuPhim,
    deleteShow,
    layThongTinLichChieuHeThongRapByShowDay,
    layThongTinLichChieuHeThongRapByShowDayAndManagerCinema
}