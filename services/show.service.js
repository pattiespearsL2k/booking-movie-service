const { Cinema, Movie, Show } = require('../models');
const moment = require('moment');

const createLichChieu = async (lichChieu) => {

    const newLichChieu = await new Show(lichChieu).save();

    await Movie.updateOne({ movieId: lichChieu.movieId }, {
        $push: {
            listShow: {
                showID: newLichChieu.showID,
                roomID: lichChieu.roomID,
                cinemaChildID: lichChieu.cinemaChildID
            }
        }
    });
    return newLichChieu;
}


const getThongTinLichChieuTheoHeThongRap = async () => {
    const list = await Cinema.aggregate([{
        $lookup: {
            from: "CinemaChild",
            localField: "cinemaID",
            foreignField: "cinemaID",
            as: "lstCinemaChild",
            pipeline: [{
                $lookup: {
                    from: "Movie",
                    localField: "listRoom.roomID",
                    foreignField: "listShow.roomID",
                    as: "listMovie",
                    pipeline: [{
                        $lookup: {
                            from: "Show",
                            localField: "listShow.cinemaChildID",
                            foreignField: "cinemaChildID",
                            as: "lstShowFlowMovie"
                        }
                    }]
                },
            }]
        }
    },
    {
        $project: {
            _id: 0,
            __v: 0,
            "lstCinemaChild.listRoom": 0,
            "lstCinemaChild._id": 0,
            "lstCinemaChild.cinemaID": 0,
            "lstCinemaChild.listMovie._id": 0,
            "lstCinemaChild.listMovie.__v": 0,
            "lstCinemaChild.listMovie.trailer": 0,
            "lstCinemaChild.listMovie.description": 0,
            "lstCinemaChild.listMovie.releaseDate": 0,
            "lstCinemaChild.listMovie.rating": 0,
            "lstCinemaChild.listMovie.listShow": 0,
            "lstCinemaChild.listMovie.lstShowFlowMovie._id": 0,
            "lstCinemaChild.listMovie.lstShowFlowMovie.__v": 0,
            "lstCinemaChild.listMovie.lstShowFlowMovie.movieId": 0,

        }
    },
    ]);
    return list;
};
const getShowByDate = async (showday, cinemaID, movieId) => {
    let options= { "lstCinemaChild.listMovie.lstShowFlowMovie.showday": showday }
    if(cinemaID){
       options =  { "lstCinemaChild.listMovie.lstShowFlowMovie.showday": showday, cinemaID: cinemaID }
    }
    const arrayCinemaChildID = await getCinemaChildIDsByShowDayAndMovieID(showday);
    const list = await Cinema.aggregate([{
        $lookup: {
            from: "CinemaChild",
            localField: "cinemaID",
            foreignField: "cinemaID",
            as: "lstCinemaChild",
            pipeline: [
                {
                    $match: {
                        // get cinemaChildID in arrayCinemaChildID
                        cinemaChildID: {
                            $in: arrayCinemaChildID
                        }
                    }
                },
                {
                    $lookup: {
                        from: "Movie",
                        localField: "listRoom.roomID",
                        foreignField: "listShow.roomID",
                        as: "listMovie",
                        pipeline: [
                            {
                                $match: {movieId: movieId}
                            },
                            {
                            $lookup: {
                                from: "Show",
                                localField: "listShow.cinemaChildID",
                                foreignField: "cinemaChildID",
                                as: "lstShowFlowMovie",
                                pipeline: [
                                    {
                                        $match: { showday: showday}
                                    }
                                ]
                            }
                        }]
                    },
                }]
        }
    },
    {
        $match: options
    },
    {
        $project: {
            _id: 0,
            __v: 0,
            "lstCinemaChild.listRoom": 0,
            "lstCinemaChild._id": 0,
            "lstCinemaChild.cinemaID": 0,
            "lstCinemaChild.listMovie._id": 0,
            "lstCinemaChild.listMovie.__v": 0,
            "lstCinemaChild.listMovie.trailer": 0,
            "lstCinemaChild.listMovie.description": 0,
            "lstCinemaChild.listMovie.releaseDate": 0,
            "lstCinemaChild.listMovie.rating": 0,
            "lstCinemaChild.listMovie.listShow": 0,
            "lstCinemaChild.listMovie.lstShowFlowMovie._id": 0,
            "lstCinemaChild.listMovie.lstShowFlowMovie.__v": 0,
            "lstCinemaChild.listMovie.lstShowFlowMovie.movieId": 0,

        }
    },
    ]);
    return list;
}
const getLichChieuByMaCum = async (cinemaChildID) => {
    const list = await Show.find({ cinemaChildID: cinemaChildID });
    return list;
}
const getDanhSachPhongVe = async (showID) => {
    const list = await Show.aggregate([
        {
            $match: {
                showID: showID
            }
        },
        {
            $lookup: {
                from: "Movie",
                localField: "movieId",
                foreignField: "movieId",
                as: "phim"
            },
        },
        {
            $lookup: {
                from: "Chair",
                localField: "showID",
                foreignField: "showID",
                as: "listChair"
            },
        },
        {
            $lookup: {
                from: "CinemaChild",
                localField: "cinemaChildID",
                foreignField: "cinemaChildID",
                as: "rap"
            },
        },
        {
            $project: {
                "listChair._id": 0,
                "listChair.__v": 0
            }
        }]);
    const lichChieu = Object.values(list);
    const thongTinPhim = {
        showID: lichChieu[0].showID,
        cinemaChildName: lichChieu[0].rap[0].cinemaChildName,
        roomName: lichChieu[0].roomName,
        address: lichChieu[0].rap[0].address,
        title: lichChieu[0].phim[0].title,
        image: lichChieu[0].phim[0].image,
        showday: lichChieu[0].showday,
        showtime: lichChieu[0].showtime
    };
    const data = {
        informationMovie: thongTinPhim,
        listChair: lichChieu[0].listChair
    }
    return data;
}
const getDanhSachHeThongRapByMaPhim = async (maPhim, showday) => {
    let options = {movieId: maPhim};
    const arrayCinemaChildID = await getCinemaChildIDsByShowDayAndMovieID(showday, maPhim);
    if(showday){
        options = {showday: showday, movieId: maPhim}
    }
    const list = await Cinema.aggregate([{
        $lookup: {
            from: "CinemaChild",
            localField: "cinemaID",
            foreignField: "cinemaID",
            as: "cumRapChieu",
            pipeline: [
                {
                $lookup: {
                    from: "Show",
                    localField: "cinemaChildID",
                    foreignField: "cinemaChildID",
                    as: "lichChieuPhim",
                    pipeline: [
                        {
                            $match: options
                        }
                    ]
                },
            },
            {
                $match: {
                    // get cinemaChildID in arrayCinemaChildID
                    cinemaChildID: {
                        $in: arrayCinemaChildID
                    }
                }
            }
        ]
        }
    },
    {
        $match: {
            "cumRapChieu.lichChieuPhim.movieId": maPhim
        }
    },
    {
        $project: {
            _id: 0,
            __v: 0,
            "cumRapChieu.listRoom": 0,
            biDanh: 0,
            "cumRapChieu._id": 0,
            "cumRapChieu.cinemaID": 0,
            "cumRapChieu.lichChieuPhim._id": 0,
            "cumRapChieu.lichChieuPhim.__v": 0,
            "cumRapChieu.lichChieuPhim.cinemaChildID": 0
        }
    },
    ]);
    return list;
}
const getShowByMaRapAndDate = async (roomID, showtime, showday) => {
    const show = await Show.findOne({ roomID: roomID, showtime: showtime, showday: showday });
    return show;
}
const deleteShowById = async (showID) => {
    await Show.findOne({ showID: showID }).remove();
}
const getShowByShowID = async (showID) => {
    const show = await Show.findOne({ showID: showID });
    return show;
}
const getCinemaChildIDsByShowDayAndMovieID = async (showday, movieId) => {
    const list = await Show.find({ showday: showday, movieId:  movieId});
    let array = [];
    for (let item of list) {
        array.includes(item.cinemaChildID) ? array = array : array.push(item.cinemaChildID);
    }
    return array;

}
module.exports = {
    createLichChieu,
    getThongTinLichChieuTheoHeThongRap,
    getLichChieuByMaCum,
    getDanhSachPhongVe,
    getDanhSachHeThongRapByMaPhim,
    getShowByMaRapAndDate,
    deleteShowById,
    getShowByShowID,
    getShowByDate
}