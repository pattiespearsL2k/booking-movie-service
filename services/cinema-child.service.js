const { CinemaChild } = require('../models');

const getCumRapTheoMaHeThong = async(cinemaID) => {
    const list = await CinemaChild.find({ cinemaID: cinemaID }, {
        _id: 0,
        __v: 0,
        cinemaID: 0
    });
    return list;
}

const getTenRapByMaRap = async(roomID) => {
    let data = {
        cinemaChildID: '',
        roomName: ''
    }
    const cumRap = await CinemaChild.findOne({ "listRoom.roomID": roomID });
    data.cinemaChildID = cumRap.cinemaChildID;
    for (const item of cumRap.listRoom) {
        if (item.roomID === roomID) {
            data.roomName = item.roomName;
            break;
        }
    }
    return data;
}

module.exports = {
    getCumRapTheoMaHeThong,
    getTenRapByMaRap
}