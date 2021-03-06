const {
    checkTaiKhoanAndEmail,
    createNguoiDung,
    getNguoiDungByTaiKhoan,
    getDanhSachNguoiDung,
    getThongTinNguoiDungByTaiKhoan,
    updateThongTinNguoiDungByTaiKhoan,
    getNguoiDungByEmail,
    deleteNguoiDungByTaiKhoan,
    getListVeByTaiKhoan,
    getGhebyMaGhe,
    getRoleByRoleId,
    checkCinema,
    getCinemaIDByUserId,
} = require('../services');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');
const dangKyNguoiDung = async (req, res) => {
    try {
        const nguoiDung = req.body;
        if (!nguoiDung.username || !nguoiDung.roleId || !nguoiDung.email || !nguoiDung.password || nguoiDung.roleId === "" || nguoiDung.username === "" || nguoiDung.password === "" || nguoiDung.email === "") {
            return res.status(400).send("Bạn chưa nhập đủ thông tin");
        }
        const check_1 = await checkTaiKhoanAndEmail(nguoiDung.username, nguoiDung.email);
        if (check_1 !== null) {
            return res.status(400).send(check_1);
        }
        const hashPassword = await bcrypt.hash(nguoiDung.password, 10);
        nguoiDung.password = hashPassword;
        const newNguoiDung = await createNguoiDung(nguoiDung);
        delete nguoiDung.password;
        return res.status(200).json(nguoiDung);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }

}

const dangNhapNguoiDung = async (req, res) => {
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
        if(nguoiDung.roleId === 2){
            const cinemaID = await getCinemaIDByUserId(nguoiDung.userId);
            const check = await checkCinema(cinemaID);
            if(!check){
                return res.status(400).json("Cinema của user không tồn tại");
            }
        }
        const role = await getRoleByRoleId(nguoiDung.roleId);
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
        return res.status(400).json(err);
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

const getDSNguoiDung = async (req, res) => {
    try {
        const { textSearch } = req.query;
        const list = await getDanhSachNguoiDung(textSearch);
        const array = Object.values(list);
        let items = [];
        for (let item of array) {
            const role = await getRoleByRoleId(item.roleId);
            items.push({
                username: item.username,
                name: item.name,
                phoneNumber: item.phoneNumber,
                email: item.email,
                role: role,
                userId: item.userId
            });
        }
        return res.status(200).json(items);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const getLayThongTinNguoiDung = async (req, res) => {
    try {
        const user = req.user;
        const username = user.username;
        const checkTaiKhoan = await checkTaiKhoanAndEmail(username, "");
        if (checkTaiKhoan === null) {
            return res.status(400).send("Tài khoản không hợp lệ!");
        }
        const nguoiDung = await getThongTinNguoiDungByTaiKhoan(username);
        const role = await getRoleByRoleId(nguoiDung.roleId);
        //get ve
        let listVe = [];
        const list = await getListVeByTaiKhoan(username);
        for (let item of list) {
            let listGhe = []
            for (let gheItem of item.listChair) {
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
        return res.status(400).json(err);
    }
}

const getDetailUserByUsernameOfAdmin = async(req, res) => {
    try {
        const {username} = req.query;
        const user = await getThongTinNguoiDungByTaiKhoan(username);
        return res.status(200).json({
            username: user.username,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber
        });
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

const updateThongTinNguoiDung = async (req, res) => {
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
        return res.status(400).json(err);
    }
}
const deleteNguoiDung = async (req, res) => {
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
        return res.status(400).json(err);
    }
}
const changePassword = async (req, res) => {
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
        return res.status(400).json(err);
    }
}
module.exports = {
    dangKyNguoiDung,
    dangNhapNguoiDung,
    getDSNguoiDung,
    getLayThongTinNguoiDung,
    updateThongTinNguoiDung,
    deleteNguoiDung,
    changePassword,
    getDetailUserByUsernameOfAdmin
}