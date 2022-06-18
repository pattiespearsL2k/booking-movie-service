const {
    createVe,
    getPhimByMaLichChieu
} = require('../services');

const datVe = async(req, res) => {
    try{
        const ve = req.body;
        const phim = await getPhimByMaLichChieu(ve.showID);
        ve.titleMovie = phim.title;
        await createVe(ve);
        return res.status(200).send("Đặt vé thành công!")
    }catch(err){
        console.log(err);
        return res.status(600).json(err);
    }
}
module.exports = {
    datVe
}