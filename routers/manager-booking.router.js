const express = require('express');

const router = express.Router();

const {
    taoLichChieu,
    isAuthenticated,
    checkRoleQuanTri,
    layDanhSachPhongVe,
    datVe
} = require('../controllers');

router.post('/TaoLichChieu', isAuthenticated, checkRoleQuanTri, taoLichChieu);

router.get('/LayDanhSachPhongVe', layDanhSachPhongVe);

router.post('/DatVe',datVe);
module.exports = router;