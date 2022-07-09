const { CinemaChild } = require('../models');
const {
    getCumRapTheoMaHeThong,
    createCinemaChild,
    updateCinemaChildByID,
    deleteCinemaChildByID,
    getCinemaByCinemaID
} = require('../services');

const layThongTinCumRapTheoHeThong = async (req, res) => {
    try {
        const { maHeThongRap } = req.query;
        const list = await getCumRapTheoMaHeThong(maHeThongRap);
        return res.status(200).json(list);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const createNewCinemaChild = async (req, res) => {
    try {
        const cinemaChild = req.body;
        const cinema = await getCinemaByCinemaID(cinemaChild.cinemaID);
        if (!cinema) {
            return res.status(400).send("cinemaID không tồn tại!");
        }
        const newCinemaChild = await createCinemaChild(cinemaChild);
        return res.status(200).json(newCinemaChild);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const updateCinemaChild = async (req, res) => {
    try {
        const cinemaChild = req.body;
        await updateCinemaChildByID(cinemaChild);
        return res.status(200).send("Cập nhật thành công");
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const deleteCinemaChild = async (req, res) => {
    try {
        const { cinemaChildID } = req.query;
        await deleteCinemaChildByID(cinemaChildID);
        return res.status(200).send("Xoá thành công");
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

module.exports = {
    layThongTinCumRapTheoHeThong,
    createNewCinemaChild,
    updateCinemaChild,
    deleteCinemaChild
}