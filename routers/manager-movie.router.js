const express = require('express');

const router = express.Router();
const upload = require('../utils/multer');

const {
    isAuthenticated,
    checkRoleAdmin,
    themPhim,
    suaPhim,
    layThongTinPhim,
    xoaPhim,
    layDanhSachPhim
} = require('../controllers');

router.post('/ThemPhimUploadHinh', upload.single('image'), themPhim);

router.post('/CapNhatPhim', isAuthenticated, checkRoleAdmin, suaPhim);

router.get('/LayThongTinPhim', layThongTinPhim);

router.delete('/XoaPhim', isAuthenticated, checkRoleAdmin, xoaPhim);

router.get('/LayDanhSachPhim', layDanhSachPhim);

module.exports = router;