const { Cinema } = require('../models');

const getDanhSachHeThongRap = async() => {
    const list = await Cinema.find({isDelete: false}, {
        _id: 0,
        __v: 0
    });
    return list;
}
const getCinemaByCinemaID = async(cinemaID) => {
    const cinema = await Cinema.aggregate([
        {
            $lookup: {
                from: "CinemaChild",
                localField: "cinemaID",
                foreignField: "cinemaID",
                as: "cinemaChild"
            }
        },
        {
            $match: {
                cinemaID: cinemaID
            }
        },
        {
            $project: {
                _id: 0,
                __v: 0,
                biDanh: 0,
                "cinemaChild._id": 0,
                "cinemaChild.cinemaID": 0,
            }
        }
    ])
    return Object.values(cinema)[0];
}

const createCinema = async (cinema) => {
    const newCinema = await new Cinema(cinema).save();
    return newCinema;
}

const updateCinema = async (cinema) => {
    await Cinema.updateOne(
        {cinemaID: cinema.cinemaID},
        {
            $set: (cinema)
        }
    );
}

const deleteCinema  = async (cinemaID) => {
    await Cinema.updateOne(
        {cinemaID: cinemaID},
        {
            $set: {isDelete:  true}
        }
    )
}
module.exports = {
    getDanhSachHeThongRap,
    getCinemaByCinemaID,
    updateCinema,
    deleteCinema,
    createCinema
}