const {Reviews} = require('../models');

const createReview = async(review) => {
    const newReview = await new Reviews(review).save();
    return newReview;
}

const getListReview = async() => {
    const list = await Reviews.find({},{
        __v:0,
        _id: 0
    });
    return list;
}

const updateReview = async(review) => {
    await Reviews.updateOne(
        {reviewId: review.reviewId},
        {
            $set: (review)
        }
    )
}
const getReviewById = async(reviewId) => {
    const review = await Reviews.findOne({reviewId: reviewId},{
        __v:0,
        _id: 0
    });
    return review;

}

const deleteReviewById =async(reviewId) => {
    await Reviews.findOne({reviewId: reviewId}).remove();
}

module.exports ={
    createReview,
    getListReview,
    getReviewById,
    updateReview,
    deleteReviewById
}