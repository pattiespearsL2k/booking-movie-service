const { CinemaChild, Cinema } = require('../models');
const uuid = require('uuid');
const rn = require('random-number');
const { array } = require('../utils/multer');
const getCumRapTheoMaHeThong = async(cinemaID) => {
    const list = await CinemaChild.find({ cinemaID: cinemaID, isDelete: false }, {
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
const getCinemaIDByRoomID = async(roomID) => {
    const cinemaChild = await CinemaChild.findOne({'listRoom.roomID' : roomID});
    return cinemaChild.cinemaID;
}
const createCinemaChild = async(cinemaChild) => {
    cinemaChild.cinemaChildID = uuid.v4();
    let arrayRoom = [];
    const options = {
        min:  1000
      , max:  1000000
      , integer: true
    }
    for(let item of cinemaChild.listRoom){
        item.romID = rn(options); 
        arrayRoom.push(item);
    }
    cinemaChild.listRoom = arrayRoom;
    const newCinemaChild = await new CinemaChild(cinemaChild).save();
    return newCinemaChild;
}
const updateCinemaChildByID = async (cinemaChild) => {
    await CinemaChild.updateOne(
        {cinemaChildID: cinemaChild.cinemaChildID},
        {
            $set: (cinemaChild)
        }
    )
}
const deleteCinemaChildByID = async(cinemaChildID) => {
    await CinemaChild.updateOne(
        {cinemaChildID: cinemaChildID},
        {
            $set: {isDelete: true}
        }
    )
}
module.exports = {
    getCumRapTheoMaHeThong,
    getTenRapByMaRap,
    getCinemaIDByRoomID,
    createCinemaChild,
    updateCinemaChildByID,
    deleteCinemaChildByID
}