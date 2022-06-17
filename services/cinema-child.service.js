const { CinemaChild } = require('../models');

const getCumRapTheoMaHeThong = async(cinemaID) => {
    const list = await CinemaChild.find({ cinemaID: cinemaID }, {
        _id: 0,
        __v: 0,
        cinemaID: 0
    });
    return list;
}

const getrowNameByMaRap = async(cinemaChildID) => {
    let data = {
        cinemaChildID: '',
        rowName: ''
    }
    const cumRap = await CinemaChild.findOne({ "listRow.cinemaChildID": cinemaChildID });
    data.cinemaChildID = cumRap.cinemaChildID;
    for (const item of cumRap.listRow) {
        if (item.cinemaChildID === cinemaChildID) {
            data.rowName = item.rowName;
            break;
        }
    }
    return data;
}

module.exports = {
    getCumRapTheoMaHeThong,
    getrowNameByMaRap
}