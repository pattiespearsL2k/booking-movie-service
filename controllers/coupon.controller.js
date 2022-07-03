const {
    createVe,
    getPhimByMaLichChieu
} = require('../services');

const datVe = async(req, res) => {
    try{
        const ve = req.body;
        // get phim when send req showID.
        const phim = await getPhimByMaLichChieu(Number(ve.showID));
        ve.titleMovie = phim.title;
        await createVe(ve);
        return res.status(200).send("Đặt vé thành công!")
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

module.exports = {
    datVe
}