const express = require('express');

const router = express.Router();

const {
    layThongTinCumRapTheoHeThong,
    layThongTinHeThongRap,
    layThongTinLichChieuPhim,
    layThongTinLichChieuHeThongRap,
    isAuthenticated,
    layThongTinHeThongRapByUserID,
    layThongTinLichChieuHeThongRapByShowDay,
    checkRoleQuanTri,
    layThongTinLichChieuHeThongRapByShowDayAndManagerCinema
} = require('../controllers');

router.get('/LayThongTinHeThongRap', layThongTinHeThongRap);
router.get('/LayThongTinCumRapTheoHeThong', layThongTinCumRapTheoHeThong);
router.get('/LayThongTinLichChieuPhim', layThongTinLichChieuPhim);
router.get('/LayThongTinLichChieuHeThongRap', layThongTinLichChieuHeThongRap);
router.get('/LayThongTinLichChieuHeThongRapTheoNgay', layThongTinLichChieuHeThongRapByShowDay);
router.get('/LayThongTinHeThongRapByUserID', isAuthenticated, layThongTinHeThongRapByUserID);
router.get('/LayThongTinLichChieuHeThongRapTheoNgayVaTheoRap', isAuthenticated, checkRoleQuanTri, layThongTinLichChieuHeThongRapByShowDayAndManagerCinema);



module.exports = router;