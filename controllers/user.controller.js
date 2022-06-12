const {
    checkTaiKhoanAndEmail,
    createNguoiDung,
    getNguoiDungByTaiKhoan,
    getDanhSachNguoiDung,
    getThongTinNguoiDungByTaiKhoan,
    updateThongTinNguoiDungByTaiKhoan,
    getNguoiDungByEmail,
    deleteNguoiDungByTaiKhoan,
    createRoleUser,
    getNameRoleByUserId
} = require('../services');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');
const dangKyNguoiDung = async(req, res) => {
    try {
        const nguoiDung = req.body;
        const check_1 = await checkTaiKhoanAndEmail(nguoiDung.taiKhoan, nguoiDung.email);
        if (check_1 !== null) {
            return res.status(400).send(check_1);
        }
        const hashPassword = await bcrypt.hash(nguoiDung.matKhau, 10);
        nguoiDung.matKhau = hashPassword;
        const newNguoiDung = await createNguoiDung(nguoiDung);
        await createRoleUser(newNguoiDung.userId, nguoiDung.maLoaiNguoiDung);
        delete nguoiDung.matKhau;
        return res.status(200).json(nguoiDung);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }

}

const dangNhapNguoiDung = async(req, res) => {
    try {
        const { taiKhoan, matKhau } = req.body;
        let nguoiDung = await getNguoiDungByTaiKhoan(taiKhoan);
        if (!nguoiDung) {
            return res.status(400).send("Tài khoản hoặc mật khẩu không đúng!");
        }
        let isCorrectPass = await bcrypt.compare(matKhau, nguoiDung.password);
        if (!isCorrectPass) {
            return res.status(400).send("Tài khoản hoặc mật khẩu không đúng!");
        }
        const role = await getNameRoleByUserId(nguoiDung.userId);
        const accessToken = signAccessToken(nguoiDung.userId, role);
        const data = {
            taiKhoan: nguoiDung.username,
            hoTen: nguoiDung.name,
            email: nguoiDung.email,
            soDT: nguoiDung.phoneNumber,
            gioiTinh: nguoiDung.gender,
            maLoaiNguouiDung: role,
            accessToken: accessToken
        }
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }
}

const signAccessToken = (user_id, maLoaiNguoiDung) => {
    return jwt.sign({
            id: user_id,
            role: maLoaiNguoiDung
        },
        config.AUTH_TOKEN_SECRET.ACCESS_TOKEN
    );
}

const getDSNguoiDung = async(req, res) => {
    try {
        const { tuKhoa } = req.query;
        const list = await getDanhSachNguoiDung(tuKhoa);
        const array = Object.values(list);
        let newArray = [];
        for (const item of array) {
            const role = await getNameRoleByUserId(item.userId);
            newArray.push({
                taiKhoan: item.username,
                hoTen: item.name,
                email: item.email,
                soDT: item.phoneNumber,
                gioiTinh: item.gender,
                maLoaiNguoiDung: role,
            });
        }
        return res.status(200).json(newArray);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }
}
const getDSNguoiDungPhanTrang = async(req, res) => {
    try {
        const { tuKhoa, MaNhom, soPhanTuTrenTrang, soTrang } = req.query;
        const limit = Number(soPhanTuTrenTrang);
        let skip;
        if (Number(soTrang) <= 0) {
            skip = 0;
        } else {
            skip = (Number(soTrang) - 1) * Number(soPhanTuTrenTrang);
        }
        const list = await getDanhSachNguoiDung(tuKhoa);
        const array = Object.values(list).slice(skip, (limit + skip));
        let items = [];
        for (const item of array) {
            const role = await getNameRoleByUserId(item.userId);
            items.push({
                taiKhoan: item.username,
                hoTen: item.name,
                email: item.email,
                soDT: item.phoneNumber,
                gioiTinh: item.gender,
                maLoaiNguoiDung: role,
            });
        }
        const totalPages = Math.ceil(((Object.values(list).length) / Number(soPhanTuTrenTrang)));
        const data = {
            currentPage: soTrang,
            count: items.length,
            totalPages: totalPages,
            totalCount: Object.values(list).length,
            items: items
        }
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }

}
const getLayThongTinNguoiDung = async(req, res) => {
    try {
        const { taiKhoan } = req.body;
        const checkTaiKhoan = await checkTaiKhoanAndEmail(taiKhoan, "");
        if (checkTaiKhoan === null) {
            return res.status(400).send("Tài khoản không hợp lệ!");
        }
        const nguoiDung = await getThongTinNguoiDungByTaiKhoan(taiKhoan);
        const role = await getNameRoleByUserId(nguoiDung.userId);
        const data = {
            taiKhoan: nguoiDung.username,
            hoTen: nguoiDung.name,
            email: nguoiDung.email,
            soDT: nguoiDung.phoneNumber,
            gioiTinh: nguoiDung.gender,
            maLoaiNguoiDung: role,
        }
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }
}

const updateThongTinNguoiDung = async(req, res) => {
    try {
        const nguoiDung = req.body;
        const taiKhoan = await getNguoiDungByTaiKhoan(nguoiDung.taiKhoan);
        if (!taiKhoan) {
            return res.status(400).send("Tài khoản không tồn tại!");
        }
        if (nguoiDung.email !== taiKhoan.email) {
            const taiKhoan1 = await getNguoiDungByEmail(nguoiDung.email);
            if (taiKhoan1) {
                return res.status(400).send("Email đã tồn tại!");
            }
        }
        await updateThongTinNguoiDungByTaiKhoan(nguoiDung);
        return res.status(200).json(nguoiDung);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }
}
const deleteNguoiDung = async(req, res) => {
    try {
        const { taiKhoan } = req.query;
        const nguoiDung = await getNguoiDungByTaiKhoan(taiKhoan);
        if (!nguoiDung) {
            return res.status(400).send("Tài khoản không tồn tại!");
        }
        await deleteNguoiDungByTaiKhoan(taiKhoan);
        return res.status(200).send("Xóa thành công!");
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }
}

module.exports = {
    dangKyNguoiDung,
    dangNhapNguoiDung,
    getDSNguoiDung,
    getDSNguoiDungPhanTrang,
    getLayThongTinNguoiDung,
    updateThongTinNguoiDung,
    deleteNguoiDung,
}