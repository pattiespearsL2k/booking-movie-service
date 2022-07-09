const express = require('express');

const router = express.Router();

const upload = require('../utils/multer');
const {
    layThongTinCumRapTheoHeThong,
    layThongTinHeThongRap,
    layThongTinLichChieuPhim,
    layThongTinLichChieuHeThongRap,
    isAuthenticated,
    layThongTinHeThongRapByUserID,
    layThongTinLichChieuHeThongRapByShowDay,
    checkRoleQuanTri,
    layThongTinLichChieuHeThongRapByShowDayAndManagerCinema,
    checkRoleAdmin,
    createNewCinema,
    updateCinemaByCinemaID,
    deleteCinemaByID,
    createNewCinemaChild,
    updateCinemaChild,
    deleteCinemaChild,
    getCinemaByID,
    getCinemaChildByID
} = require('../controllers');

router.get('/LayThongTinHeThongRap', layThongTinHeThongRap);
router.get('/LayThongTinCumRapTheoHeThong', layThongTinCumRapTheoHeThong);
router.get('/LayThongTinLichChieuPhim', layThongTinLichChieuPhim);
router.get('/LayThongTinLichChieuHeThongRap', layThongTinLichChieuHeThongRap);
router.get('/LayThongTinLichChieuHeThongRapTheoNgay', layThongTinLichChieuHeThongRapByShowDay);
router.get('/LayThongTinHeThongRapByUserID', isAuthenticated, layThongTinHeThongRapByUserID);
router.get('/LayThongTinLichChieuHeThongRapTheoNgayVaTheoRap', isAuthenticated, checkRoleQuanTri, layThongTinLichChieuHeThongRapByShowDayAndManagerCinema);
router.post('/TaoHeThongRap', upload.single('logo'), isAuthenticated, checkRoleAdmin, createNewCinema);
router.put('/CapNhatThongTinHeThong', upload.single('logo'),isAuthenticated, checkRoleAdmin, updateCinemaByCinemaID);
router.delete('/XoaHeThongRap', isAuthenticated, checkRoleAdmin, deleteCinemaByID);

router.post('/ThemCumRap', isAuthenticated, checkRoleQuanTri, createNewCinemaChild);
router.put('/CapNhatCumRap', isAuthenticated, checkRoleQuanTri, updateCinemaChild);
router.delete('/XoaCumRap', isAuthenticated, checkRoleQuanTri, deleteCinemaChild);

router.get('/LayThongTinChiTietHeThongRap',getCinemaByID);
router.get('/LayThongTinChiTietCumRap', getCinemaChildByID);
module.exports = router;