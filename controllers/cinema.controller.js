const { 
    getDanhSachHeThongRap,
    getCinemaByCinemaID,
    getCinemaIDByUserId,
    createCinema,
    updateCinema,
    deleteCinema
 } = require('../services');

 const cloudinary = require('../utils/cloudinary');

const layThongTinHeThongRap = async(req, res) => {
    try {
        const list = await getDanhSachHeThongRap();
        return res.status(200).json(list);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const layThongTinHeThongRapByUserID = async(req, res) => {
    try {
        const user = req.user;
        const cinemaID = await getCinemaIDByUserId(user.id);
        const cinema = await getCinemaByCinemaID(cinemaID);
        return res.status(200).json(cinema);
    }catch(err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const createNewCinema = async(req, res) => {
    try {
        const cinema = req.body;
        const file = req.file;
        const cinemaOld = await getCinemaByCinemaID(cinema.cinemaID);
        if(cinemaOld) {
            return res.status(400).send("cinemaID đã tồn tại");
        }
        if(file){
            result = await cloudinary.uploader.upload(req.file.path);
            cinema.logo = result.secure_url;
        }else{
            return res.status(400).send('logo chưa nhập!');
        }
        const newCinema = await createCinema(cinema);
        return res.status(200).json(cinema);
    }catch(err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const updateCinemaByCinemaID = async (req, res) => {
    try {
        const cinema = req.body;
        const file = req.file;
        if(file){
            result = await cloudinary.uploader.upload(req.file.path);
            cinema.logo = result.secure_url;
        }
        await updateCinema(cinema);
        return res.status(200).send("Cập nhật thành công !");
    }catch(err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const deleteCinemaByID = async(req, res) => {
    try {
        const {cinemaID} = req.query;
        await deleteCinema(cinemaID);
        return res.status(200).send("Xóa thành công !");
    }catch(err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const getCinemaByID = async(req, res) => {
    try {
        const {cinemaID} = req.query;
        const cinema = await getCinemaByCinemaID(cinemaID);
        return res.status(200).json({
            cinemaID: cinema.cinemaID,
            name: cinema.name,
            logo: cinema.logo,
            aliases: cinema.aliases
        });
    }catch(err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

module.exports = {
    layThongTinHeThongRap,
    layThongTinHeThongRapByUserID,
    createNewCinema,
    updateCinemaByCinemaID,
    deleteCinemaByID,
    getCinemaByID
}