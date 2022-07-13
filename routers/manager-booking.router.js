const express = require('express');
const router = express.Router();
const {
    taoLichChieu,
    isAuthenticated,
    checkRoleQuanTri,
    layDanhSachPhongVe,
    deleteShow,
    datVe,
    createNewPayment,
    getListPayment
} = require('../controllers');

router.post('/TaoLichChieu', isAuthenticated, checkRoleQuanTri, taoLichChieu);

router.get('/LayDanhSachPhongVe', layDanhSachPhongVe);

router.delete('/XoaLichChieu', isAuthenticated, checkRoleQuanTri, deleteShow);

router.post('/DatVe', isAuthenticated, datVe);

router.post('/ThanhToan', isAuthenticated, createNewPayment);

router.get('/LayDanhSachThanhToan', isAuthenticated, checkRoleQuanTri, getListPayment);

module.exports = router;