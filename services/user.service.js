const { User } = require('../models');

const createNguoiDung = async(user) => {
    const newUser = await new User({
        username: user.taiKhoan,
        password: user.matKhau,
        email: user.email,
        phoneNumber: user.soDt,
        gender: user.gioiTinh,
        name: user.hoTen
    }).save();
    return newUser;
}

const checkTaiKhoanAndEmail = async(username, email) => {
    const user = await User.findOne({ $or: [{ email: email }, { username: username }] });
    if (user) {
        if (user.username === username) {
            return "Tài khoản đã tồn tại!";
        } else {
            return "Email đã tồn tại!";
        }
    } else {
        return null;
    }
};

const getNguoiDungByTaiKhoan = async(username) => {
    const user = await User.findOne({ username: username });
    return user;
}

const getDanhSachNguoiDung = async(tuKhoa) => {
    let option;
    if (!tuKhoa) {
        option = {};
    } else {
        option = { $text: { $search: tuKhoa } };
    }
    const list = await User.find(option, {
        password: 0,
        __v: 0,
        _id: 0
    });
    return list;
}

const getThongTinNguoiDungByTaiKhoan = async(username) => {
    const option = {
        username: username
    };
    const user = await User.findOne(option, {
        __v: 0,
        _id: 0
    });
    return user;
}

const updateThongTinNguoiDungByTaiKhoan = async(user) => {
    const data = {
        username: user.taiKhoan,
        email: user.email,
        phoneNumber: user.soDt,
        gender: user.gioiTinh,
        name: user.hoTen
    }
    await User.updateOne({ username: user.taiKhoan }, {
        $set: (data)
    });
}
const getNguoiDungByEmail = async(email) => {
    const nguoiDung = await User.findOne({ email: email });
    return nguoiDung;
}

const deleteNguoiDungByTaiKhoan = async(taiKhoan) => {
    const nguoiDung = await User.findOne({ username: taiKhoan });
    await nguoiDung.remove();
}

module.exports = {
    createNguoiDung,
    checkTaiKhoanAndEmail,
    getNguoiDungByTaiKhoan,
    getDanhSachNguoiDung,
    getThongTinNguoiDungByTaiKhoan,
    updateThongTinNguoiDungByTaiKhoan,
    getNguoiDungByEmail,
    deleteNguoiDungByTaiKhoan
}