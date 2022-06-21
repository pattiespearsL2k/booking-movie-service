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
    getNameRoleByUserId,
    getListVeByTaiKhoan,
    getGhebyMaGhe
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
        const accessToken = signAccessToken(nguoiDung.userId, role, username);
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

const signAccessToken = (user_id, role, username) => {
    return jwt.sign({
            id: user_id,
            username: username,
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
        const { textSearch, countItemOfPage, countPage } = req.query;
        const limit = Number(countItemOfPage);
        let skip;
        if (Number(countPage) <= 0) {
            skip = 0;
        } else {
            skip = (Number(countPage) - 1) * Number(countItemOfPage);
        }
        const list = await getDanhSachNguoiDung(textSearch);
        const array = Object.values(list).slice(skip, (limit + skip));
        let items = [];
        for (const item of array) {
            const role = await getNameRoleByUserId(item.userId);
            item.role = role;
            delete item.password;
            items.push(item);
        }
        const totalPages = Math.ceil(((Object.values(list).length) / Number(countItemOfPage)));
        const data = {
            currentPage: countPage,
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
        const user = req.user;
        const username = user.username;
        const checkTaiKhoan = await checkTaiKhoanAndEmail(username, "");
        if (checkTaiKhoan === null) {
            return res.status(400).send("Tài khoản không hợp lệ!");
        }
        const nguoiDung = await getThongTinNguoiDungByTaiKhoan(username);
        const role = await getNameRoleByUserId(nguoiDung.userId);
        //get ve
        let listVe = [];
        const list = await getListVeByTaiKhoan(username);
        for(let item of list){
            let listGhe = [] 
            for(let gheItem of item.listChair){
                const ghe = await getGhebyMaGhe(gheItem.chairID);
                const dataGhe = {
                cinemaID: ghe[0].cumrap[0].hethong[0].cinemaID,
                cinemaName: ghe[0].cumrap[0].hethong[0].name,
                cinemaChildID: ghe[0].cumrap[0].cinemaChildID,
                cinemaChildName: ghe[0].cumrap[0].cinemaChildName,
                roomID: ghe[0].roomID,
                roomName: ghe[0].roomName,
                chairID: ghe[0].chairID,
                chairName: ghe[0].chairName
            }
            listGhe.push(dataGhe);
            }
            const dataVe = {
                couponID: item.couponID,
                bookingDate: item.bookingDate,
                titleMovie: item.titleMovie,
                price: item.price,
                listChair: listGhe
            }
            listVe.push(dataVe);
        }
        const data = {
            userId: nguoiDung.userId,
            username: nguoiDung.username,
            name: nguoiDung.name,
            email: nguoiDung.email,
            phoneNumber: nguoiDung.phoneNumber,
            role: role,
            bookingInformation: listVe
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
const changePassword = async(req, res) => {
    try {
        const { passwordOld, passwordNew, username } = req.body;
        const taiKhoan = await getNguoiDungByTaiKhoan(username);
        if (!taiKhoan) {
            return res.status(400).send("Tài khoản không tồn tại!");
        }
        let isCorrectPass = await bcrypt.compare(passwordOld, taiKhoan.password);
        if (!isCorrectPass) {
            return res.status(400).send("Mật khẩu không đúng!");
        }
        const hashPassword = await bcrypt.hash(passwordNew, 10);
        await updateThongTinNguoiDungByTaiKhoan({
            username: username,
            password: hashPassword
        });
        return res.status(200).send("Đổi mật khẩu thành công!")
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
    changePassword
}