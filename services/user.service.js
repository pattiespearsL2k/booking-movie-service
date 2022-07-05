const { User, Manager } = require('../models');

const createNguoiDung = async(user) => {
    const newUser = await new User(user).save();
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
        option = {$text: { $search: tuKhoa }};
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
    await User.updateOne({ username: user.username }, {
        $set: (user)
    });
}
const getNguoiDungByEmail = async(email) => {
    const nguoiDung = await User.findOne({ email: email });
    return nguoiDung;
}

const deleteNguoiDungByTaiKhoan = async(username) => {
    const nguoiDung = await User.findOne({ username: username });
    await nguoiDung.remove();
}

const getCinemaIDByUserId = async(userId) => {
    const manager = await Manager.findOne({userId: userId});
    if(manager){
        return manager.cinemaID;
    }else{
        return null;
    }
}



module.exports = {
    createNguoiDung,
    checkTaiKhoanAndEmail,
    getNguoiDungByTaiKhoan,
    getDanhSachNguoiDung,
    getThongTinNguoiDungByTaiKhoan,
    updateThongTinNguoiDungByTaiKhoan,
    getNguoiDungByEmail,
    deleteNguoiDungByTaiKhoan,
    getCinemaIDByUserId
}