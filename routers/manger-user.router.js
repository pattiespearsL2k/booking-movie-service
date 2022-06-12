const express = require('express');

const router = express.Router();

const {
    getDSLoaiNguoiDung,
    dangKyNguoiDung,
    dangNhapNguoiDung,
    getDSNguoiDung,
    getDSNguoiDungPhanTrang,
    getLayThongTinNguoiDung,
    isAuthenticated,
    updateThongTinNguoiDung,
    checkRoleQuanTri,
    deleteNguoiDung,
    checkRoleAdmin
} = require('../controllers');

router.get('/LayDanhSachLoaiNguoiDung', getDSLoaiNguoiDung);


router.post('/DangKy', dangKyNguoiDung);

router.post('/DangNhap', dangNhapNguoiDung);

router.get('/LayDanhSachNguoiDung', getDSNguoiDung);

router.get('/LayDanhSachNguoiDungPhanTrang', getDSNguoiDungPhanTrang);

router.post('/ThongTinTaiKhoan', getLayThongTinNguoiDung);

router.put('/CapNhatThongTinNguoiDung', isAuthenticated, updateThongTinNguoiDung);

router.post('/ThemNguoiDung', isAuthenticated, checkRoleAdmin, dangKyNguoiDung);

router.delete('/XoaNguoiDung', isAuthenticated, checkRoleAdmin, deleteNguoiDung);
module.exports = router;