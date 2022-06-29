const express = require('express');

const router = express.Router();

const {
    layThongTinCumRapTheoHeThong,
    layThongTinHeThongRap,
    layThongTinLichChieuPhim,
    layThongTinLichChieuHeThongRap
} = require('../controllers');

router.get('/LayThongTinHeThongRap', layThongTinHeThongRap);

router.get('/LayThongTinCumRapTheoHeThong', layThongTinCumRapTheoHeThong);

router.get('/LayThongTinLichChieuPhim', layThongTinLichChieuPhim);
router.get('/LayThongTinLichChieuHeThongRap', layThongTinLichChieuHeThongRap);



module.exports = router;