const {
    getListReview,
    createReview,
    getReviewById,
    updateReview,
    deleteReviewById
} = require('../services');
const cloudinary = require('../utils/cloudinary');
const createNewReview = async(req, res) => {
    try {
        const review = req.body;
        const file = req.file;
        let result;
        if (file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        review.image = result.secure_url;
        const newReview = await createReview(review);
        review.reviewId = newReview.reviewId;
        return res.status(200).json(review);
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
const getDetailReview = async(req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await getReviewById(reviewId);
        return res.status(200).json(review);
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
const updateReviewById = async(req, res) => {
    try {
        const review = req.body;
        await updateReview(review);
        return res.status(200).send('Cập nhật thành công !');
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
const deleteReview = async(req, res) => {
    try {
        const {reviewId} = req.params;
        await deleteReviewById(reviewId);
        return res.status(200).send('Xóa thành công !');
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
const getAllReview = async(req, res) => {
    try {
        const list = await getListReview();
        return res.status(200).json(list);
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
module.exports = {
    getAllReview,
    deleteReview,
    updateReviewById,
    createNewReview,
    getDetailReview
}