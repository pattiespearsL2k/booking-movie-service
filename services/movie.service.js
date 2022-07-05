const { Movie } = require('../models');

const createPhim = async(phim) => {
    const newPhim = await new Movie(phim).save();
    return newPhim;
}

const updatePhim = async(phim) => {
    await Movie.updateOne({ movieId: Number(phim.movieId)}, {
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
const updateListShowByShowID = async(showID) => {
    const movie = await Movie.findOne({"listShow.showID": showID});
    const array = Object.values(movie.listShow);
    const newArray = array.filter(item => item.showID !== showID);
    await Movie.updateOne(
        {movieId: movie.movieId},
        {
            $set: {listShow: newArray}
        }
    );
}
module.exports = {
    createPhim,
    updatePhim,
    getPhimByMaPhim,
    deletePhim,
    getDanhSachPhim,
    getPhimByMaLichChieu,
    updateListShowByShowID
}