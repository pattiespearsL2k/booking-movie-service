const express = require('express');

const router = express.Router();
const {createNewReview, getDetailReview, getAllReview,updateReviewById,deleteReview, isAuthenticated, checkRoleQuanTri} = require('../controllers');
const upload = require('../utils/multer');

router.get('/', getAllReview);

router.post('/',isAuthenticated, checkRoleQuanTri,  upload.single('image'),createNewReview);

router.get('/:reviewId', getDetailReview);

router.put('/', isAuthenticated, checkRoleQuanTri,updateReviewById);

router.delete('/:reviewId', isAuthenticated, checkRoleQuanTri,deleteReview);

module.exports = router;