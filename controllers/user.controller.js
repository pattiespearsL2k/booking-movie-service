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
        const check_1 = await checkTaiKhoanAndEmail(nguoiDung.username, nguoiDung.email);
        if (check_1 !== null) {
            return res.status(400).send(check_1);
        }
        const hashPassword = await bcrypt.hash(nguoiDung.password, 10);
        nguoiDung.password = hashPassword;
        const newNguoiDung = await createNguoiDung(nguoiDung);
        await createRoleUser(newNguoiDung.userId, nguoiDung.roleId);
        delete nguoiDung.password;
        return res.status(200).json(nguoiDung);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }

}

const dangNhapNguoiDung = async(req, res) => {
    try {
        const { username, password } = req.body;
        let nguoiDung = await getNguoiDungByTaiKhoan(username);
        if (!nguoiDung) {
            return res.status(400).send("Tài khoản hoặc mật khẩu không đúng!");
        }
        let isCorrectPass = await bcrypt.compare(password, nguoiDung.password);
        if (!isCorrectPass) {
            return res.status(400).send("Tài khoản hoặc mật khẩu không đúng!");
        }
        const role = await getNameRoleByUserId(nguoiDung.userId);
        const accessToken = signAccessToken(nguoiDung.userId, role);
        const data = {
            username: nguoiDung.username,
            name: nguoiDung.name,
            email: nguoiDung.email,
            phoneNumber: nguoiDung.phoneNumber,
            role: role,
            accessToken: accessToken
        }
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }
}

const signAccessToken = (user_id, role) => {
    return jwt.sign({
            id: user_id,
            role: role
        },
        config.AUTH_TOKEN_SECRET.ACCESS_TOKEN
    );
}

const getDSNguoiDung = async(req, res) => {
    try {
        const { textSearch } = req.query;
        const list = await getDanhSachNguoiDung(textSearch);
        const array = Object.values(list);
        let items = [];
        for (const item of array) {
            const role = await getNameRoleByUserId(item.userId);
            item.role = role;
            delete item.password;
            items.push(item);
        }
        return res.status(200).json(items);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }
}
const getDSNguoiDungPhanTrang = async(req, res) => {
    try {
        const { tuKhoa, soPhanTuTrenTrang, soTrang } = req.query;
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
            item.role = role;
            delete item.password;
            items.push(item);
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
        const { username } = req.body;
        const checkTaiKhoan = await checkTaiKhoanAndEmail(username, "");
        if (checkTaiKhoan === null) {
            return res.status(400).send("Tài khoản không hợp lệ!");
        }
        const nguoiDung = await getThongTinNguoiDungByTaiKhoan(username);
        const role = await getNameRoleByUserId(nguoiDung.userId);
        nguoiDung.role = role;
        delete nguoiDung.password;
        return res.status(200).json(nguoiDung);
    } catch (err) {
        console.log(err);
        return res.status(600).json(err);
    }
}

const updateThongTinNguoiDung = async(req, res) => {
    try {
        const nguoiDung = req.body;
        const taiKhoan = await getNguoiDungByTaiKhoan(nguoiDung.username);
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
        const { username } = req.query;
        const nguoiDung = await getNguoiDungByTaiKhoan(username);
        if (!nguoiDung) {
            return res.status(400).send("Tài khoản không tồn tại!");
        }
        await deleteNguoiDungByTaiKhoan(username);
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