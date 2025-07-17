const Product = require('./models/listing.js');
const Review = require('./models/reviews.js');

// Debug middleware to log authentication status
module.exports.debugAuth = (req, res, next) => {
    console.log('Debug - isAuthenticated:', req.isAuthenticated());
    console.log('Debug - user:', req.user ? req.user._id : 'No user');
    console.log('Debug - session:', req.session);
    next();
};

module.exports.isloggedin = (req, res, next) => {
    try {
        // Check if session exists
        if (!req.session) {
            req.flash('error', 'Session error. Please login again.');
            return res.redirect('/login');
        }
        
        // Check authentication
        if (!req.isAuthenticated() || !req.user || !req.user._id) {
            req.session.redirectUrl = req.originalUrl;
            req.flash('error', 'You must be logged in to do that!');
            return res.redirect('/login');
        }
        
        // Check if session is not expired
        if (req.session.cookie && req.session.cookie.expires && new Date() > req.session.cookie.expires) {
            req.flash('error', 'Session expired. Please login again.');
            return res.redirect('/login');
        }
        
        next();
    } catch (error) {
        console.error('Authentication middleware error:', error);
        req.flash('error', 'Authentication error. Please try again.');
        return res.redirect('/login');
    }
};

module.exports.saveredirecturl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;  
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    try {
        if (!req.user) {
            req.flash('error', 'You must be logged in to do that!');
            return res.redirect('/login');
        }
        
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            req.flash('error', 'Product not found.');
            return res.redirect('/listings');
        }
        if (!product.seller.equals(req.user._id)) {
            req.flash('error', "You don't have permission to edit this product.");
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (error) {
        console.error('Owner middleware error:', error);
        req.flash('error', 'Permission error. Please try again.');
        return res.redirect('/listings');
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    try {
        if (!req.user) {
            req.flash('error', 'You must be logged in to do that!');
            return res.redirect('/login');
        }
        
        const { id, reviewId } = req.params;
        const review = await Review.findById(reviewId);
        if (!review) {
            req.flash('error', 'Review not found.');
            return res.redirect(`/listings/${id}`);
        }
        if (!review.author.equals(req.user._id)) {
            req.flash('error', "You don't have permission to delete this review.");
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (error) {
        console.error('Review author middleware error:', error);
        req.flash('error', 'Permission error. Please try again.');
        return res.redirect('/listings');
    }
};

// Simple authentication check for wishlist operations
module.exports.isloggedinWithRecheck = (req, res, next) => {
    try {
        if (!req.isAuthenticated() || !req.user || !req.user._id) {
            req.session.redirectUrl = req.originalUrl;
            req.flash('error', 'You must be logged in to do that!');
            return res.redirect('/login');
        }
        next();
    } catch (error) {
        console.error('Authentication middleware error:', error);
        req.flash('error', 'Authentication error. Please try again.');
        return res.redirect('/login');
    }
};
