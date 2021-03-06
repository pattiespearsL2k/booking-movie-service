const jwt = require('jsonwebtoken');

const config = require('../config');

const isAuthenticated = async(req, res, next) => {
    try {
        const access_token = req.headers["authorization"].split(" ")[1];
        if (access_token) {
            const user = jwt.verify(access_token, config.AUTH_TOKEN_SECRET.ACCESS_TOKEN);
            req.user = user;
            return next();
        } else {
            return res.status(401).json({ message: "bạn chưa đăng nhập" });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).send('Lỗi xác thực');
    }
}
const checkRoleQuanTri = (req, res, next) => {
    const user = req.user;
    if (user.role === "quantri" || user.role === "admin") {
        return next();
    }
    return res.status(403).json({ message: "Bạn không phải quản trị viên" });
}
const checkRoleAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role !== "admin") {
        return res.status(403).json({ message: "Bạn không phải admin" });
    }
    return next();
}
module.exports = {
    isAuthenticated,
    checkRoleQuanTri,
    checkRoleAdmin
}