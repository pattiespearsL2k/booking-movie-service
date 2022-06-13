const express = require('express');

const router = express.Router();
const upload = require('../utils/multer');

const {
    isAuthenticated,
    checkRoleQuanTri,
    themPhim,
    suaPhim,
    layThongTinPhim,
    xoaPhim,
    layDanhSachPhim
} = require('../controllers');

router.post('/ThemPhimUploadHinh', upload.single('image'), themPhim);

router.post('/CapNhatPhim', isAuthenticated, checkRoleQuanTri, suaPhim);

router.get('/LayThongTinPhim', layThongTinPhim);

router.delete('/XoaPhim', isAuthenticated, checkRoleQuanTri, xoaPhim);

router.get('/LayDanhSachPhim', layDanhSachPhim);

module.exports = router;