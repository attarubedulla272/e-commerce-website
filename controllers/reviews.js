const Product = require('../models/listing.js');
const Review = require('../models/reviews.js');
const mongoose=require('mongoose');

module.exports.createReview=async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) throw new AppError("Product not found", 404);

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    product.reviews.push(newReview._id);

    await newReview.save();
    await product.save();

    req.flash('success', 'Review added successfully!');
    res.redirect(`/listings/${product._id}/show`);
}
module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted!');
    res.redirect(`/listings/${id}/show`);
}