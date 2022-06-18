const { Movie } = require('../models');

const createPhim = async(phim) => {
    const newPhim = await new Movie(phim).save();
    return newPhim;
}
const updatePhim = async(phim) => {
    await Movie.updateOne({ movie: phim.movieId }, {
        $set: (phim)
    });
}

const getPhimByMaPhim = async(maPhim) => {
    const phim = await Movie.findOne({ movieId: maPhim }, {
        __v: 0,
        _id: 0
    });
    return phim;
}

const deletePhim = async(maPhim) => {
    await Movie.findOne({ movieId: maPhim }).remove();
}

const getDanhSachPhim = async() => {
    const list = await Movie.find({}, {
        __v: 0,
        _id: 0
    });
    return list;
}
const getPhimByMaLichChieu = async(maLichChieu) => {
    return await Movie.findOne({"listShow.showID": maLichChieu});
}

module.exports = {
    createPhim,
    updatePhim,
    getPhimByMaPhim,
    deletePhim,
    getDanhSachPhim,
    getPhimByMaLichChieu
}