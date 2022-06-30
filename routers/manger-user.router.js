const express = require('express');

const router = express.Router();

const {
    getDSLoaiNguoiDung,
    dangKyNguoiDung,
    dangNhapNguoiDung,
    getDSNguoiDung,
    getLayThongTinNguoiDung,
    isAuthenticated,
    updateThongTinNguoiDung,
    checkRoleQuanTri,
    deleteNguoiDung,
    checkRoleAdmin,
    changePassword
} = require('../controllers');

router.get('/LayDanhSachLoaiNguoiDung', getDSLoaiNguoiDung);


router.post('/DangKy', dangKyNguoiDung);

router.post('/DangNhap', dangNhapNguoiDung);

router.get('/LayDanhSachNguoiDung', getDSNguoiDung);


router.post('/ThongTinTaiKhoan', isAuthenticated,getLayThongTinNguoiDung);

router.put('/CapNhatThongTinNguoiDung', isAuthenticated, updateThongTinNguoiDung);

router.post('/ThemNguoiDung', isAuthenticated, checkRoleAdmin, dangKyNguoiDung);

router.delete('/XoaNguoiDung', isAuthenticated, checkRoleAdmin, deleteNguoiDung);

router.put('/DoiMatKhau', isAuthenticated, changePassword);
module.exports = router;