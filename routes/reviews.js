const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const AppError = require('../utils/AppError');
const Listing = require('../models/listing.js');
const Review = require('../models/reviews.js');
const reviewSchema = require('../schemas/reviewValidation.js');
const { isloggedin, isReviewAuthor } = require('../middleware');
const reviewcontroller = require('../controllers/reviews.js');


// Validation middleware
function validateReview(req, res, next) {
    if (req.body.review && typeof req.body.review.rating === 'string') {
        req.body.review.rating = Number(req.body.review.rating);
    }
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new AppError(error.details[0].message, 400);
    }
    next();
}

// Create new review
router.post('/', isloggedin, validateReview, wrapAsync(reviewcontroller.createReview));

// Delete a review
router.delete('/:reviewId', isloggedin, isReviewAuthor, wrapAsync(reviewcontroller.destroyReview));

module.exports = router;
