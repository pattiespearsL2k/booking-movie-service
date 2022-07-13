const express = require('express');
const router = express.Router();
const {
    taoLichChieu,
    isAuthenticated,
    checkRoleQuanTri,
    layDanhSachPhongVe,
    deleteShow,
    datVe,
    getListPayment,
    getDetailCoupon
} = require('../controllers');

router.post('/TaoLichChieu', isAuthenticated, checkRoleQuanTri, taoLichChieu);

router.get('/LayDanhSachPhongVe', layDanhSachPhongVe);

router.delete('/XoaLichChieu', isAuthenticated, checkRoleQuanTri, deleteShow);

router.post('/DatVe', isAuthenticated, datVe);

router.get('/LayDanhSachThanhToan', isAuthenticated, checkRoleQuanTri, getListPayment);

router.get('/LayThongTinChiTietVe', getDetailCoupon);

module.exports = router;