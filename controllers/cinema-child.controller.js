const { CinemaChild } = require('../models');
const {
    getCumRapTheoMaHeThong,
    createCinemaChild,
    updateCinemaChildByID,
    deleteCinemaChildByID,
    getCinemaByCinemaID,
    getCinemaChildByCinemaChildID,
    getCinemaIDByUserId,
    getCinemaChildByCinemaID
} = require('../services');

const layThongTinCumRapTheoHeThong = async (req, res) => {
    try {
        const {maHeThongRap} = req.query;
        const user = req.user;
        let list;
        if(user.role !== 'admin'){
            const cinemaID = await getCinemaIDByUserId(user.id);
            list = await getCumRapTheoMaHeThong(cinemaID);
        }else{
            list = await getCumRapTheoMaHeThong(maHeThongRap);
        }
        return res.status(200).json(list);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const createNewCinemaChild = async (req, res) => {
    try {
        const user = req.user;
        const cinemaChild = req.body;
        const cinema = await getCinemaByCinemaID(cinemaChild.cinemaID);
        if (!cinema) {
            return res.status(400).send("cinemaID không tồn tại!");
        }
        if(user !== 'admin'){
            const cinemaID_1 = await getCinemaIDByUserId(user.id);
            const cinemaID_2 = await cinemaChild.cinemaID;
            if(cinemaID_1 !== cinemaID_2) {
                return res.status(400).send("Bạn không có quyền!");
            }
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
        const user = req.user;
        if(user !== 'admin'){
            const cinemaID_1 = await getCinemaIDByUserId(user.id);
            const cinemaID_2 = await cinemaChild.cinemaID;
            if(cinemaID_1 !== cinemaID_2) {
                return res.status(400).send("Bạn không có quyền!");
            }
        }
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
        const user = req.user;
        const cinemaChild = await getCinemaChildByCinemaChildID(cinemaChildID);
        if(user !== 'admin'){
            const cinemaID_1 = await getCinemaIDByUserId(user.id);
            const cinemaID_2 = await cinemaChild.cinemaID;
            if(cinemaID_1 !== cinemaID_2) {
                return res.status(400).send("Bạn không có quyền!");
            }
        }
        await deleteCinemaChildByID(cinemaChildID);
        return res.status(200).send("Xoá thành công");
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const getCinemaChildByID = async (req, res) => {
    try {
        const {cinemaChildID} = req.query;
        const cinemaChild = await getCinemaChildByCinemaChildID(cinemaChildID);
        return res.status(200).json(cinemaChild);
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
module.exports = {
    layThongTinCumRapTheoHeThong,
    createNewCinemaChild,
    updateCinemaChild,
    deleteCinemaChild,
    getCinemaChildByID,
}