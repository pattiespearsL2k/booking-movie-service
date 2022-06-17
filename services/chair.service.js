const { Chair } = require('../models');

const createDanhSachGhe = async(maLichChieu, giaVe, maRap, tenRap) => {
    const arrayVip = [20, 21, 22, 23, 25, 14, 50, 46, 70, 30, 40, 12];
    for (let i = 1; i <= 160; i++) {
        let stt;
        let loaiGhe;
        let giaVeGhe;
        if (i < 10) {
            stt = "0" + i;
        } else {
            stt = "" + i;
        }
        if (arrayVip.includes(i)) {
            loaiGhe = "Vip";
            giaVeGhe = giaVe + 15000;
        } else {
            loaiGhe = "Thuong";
            giaVeGhe = giaVe
        }
        await new Chair({
            chairName: stt,
            roomID: maRap,
            typeChair: loaiGhe,
            stt: stt,
            price: giaVeGhe,
            showID: maLichChieu,
            roomName: tenRap
        }).save();
    }
}
const updateGhe = async(taiKhoan, maGhe) => {
    await Chair.updateOne(
        {chairID: maGhe},
        {
            $set: ({booked: true, userAccount: taiKhoan})
        }
    )
}
const getGhebyMaGhe = async(maGhe) => {
    const ghe = await Chair.aggregate([
        {
            $lookup: {
                from: "CinemaChild",
                localField: "roomID",
                foreignField: "listRoom.roomID",
                as: "cumrap",
                pipeline: [
                    {
                        $lookup: {
                            from: "Cinema",
                            localField: "cinemaID",
                            foreignField: "cinemaID",
                            as: "hethong"
                        }
                    }
                ]
            }
        },
        {
            $match: {
                chairID: maGhe
            }
        }
    ]);
    return ghe;
}
module.exports = {
    createDanhSachGhe,
    updateGhe,
    getGhebyMaGhe
}