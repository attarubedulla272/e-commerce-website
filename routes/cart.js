const express = require('express');
const router = express.Router();
const { isloggedin } = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');
const cartManager = require('../utils/cartManager');
const Listing = require('../models/listing');

// Show user's wishlist/cart
router.get('/', isloggedin, wrapAsync(async (req, res) => {
    try {
    const userId = req.user._id.toString();
    const wishlistItems = await cartManager.getUserWishlist(userId);
    
    // Get full product details for each wishlist item
    const itemsWithDetails = await Promise.all(
        wishlistItems.map(async (item) => {
            try {
                const product = await Listing.findById(item.productId);
                return {
                    ...item,
                    product: product || null
                };
            } catch (error) {
                console.error('Error fetching product:', error);
                return {
                    ...item,
                    product: null
                };
            }
        })
    );
    
    res.render('cart/index', { wishlistItems: itemsWithDetails });
    } catch (error) {
        console.error('Error loading wishlist:', error);
        req.flash('error', 'Failed to load wishlist. Please try again.');
        res.render('cart/index', { wishlistItems: [] });
    }
}));

// Add item to wishlist
router.post('/add/:productId', isloggedin, wrapAsync(async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { productId } = req.params;
        
        // Validate product ID
        if (!productId) {
            req.flash('error', 'Invalid product ID.');
            return res.redirect('/listings');
        }
        
        // Get product details
        const product = await Listing.findById(productId);
        if (!product) {
            req.flash('error', 'Product not found!');
            return res.redirect('/listings');
        }
        
        // Check if product is already in wishlist
        const existingWishlist = await cartManager.getUserWishlist(userId);
        const alreadyInWishlist = existingWishlist.find(item => item.productId === productId);
        
        if (alreadyInWishlist) {
            req.flash('info', 'Product is already in your wishlist!');
            return res.redirect(`/listings/${productId}`);
        }
        
        // Prepare product data for wishlist
        const productData = {
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images && product.images.length > 0 ? product.images[0].url : null,
            description: product.description,
            brand: product.brand,
            category: product.category,
            stock: product.stock
        };
        
        await cartManager.addToWishlist(userId, productId, productData);
        
        req.flash('success', 'Item added to wishlist!');
        res.redirect(`/listings/${productId}`);
        
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        req.flash('error', 'Failed to add item to wishlist. Please try again.');
        res.redirect('/listings');
    }
}));

// Remove item from wishlist
router.delete('/remove/:productId', isloggedin, wrapAsync(async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { productId } = req.params;
        
        // Validate product ID
        if (!productId) {
            req.flash('error', 'Invalid product ID.');
            return res.redirect('/cart');
        }
        
        // Check if item exists in wishlist before removing
        const existingWishlist = await cartManager.getUserWishlist(userId);
        const itemExists = existingWishlist.find(item => item.productId === productId);
        
        if (!itemExists) {
            req.flash('error', 'Item not found in wishlist.');
            return res.redirect('/cart');
        }
        
        await cartManager.removeFromWishlist(userId, productId);
        
        req.flash('success', 'Item removed from wishlist!');
        res.redirect('/cart');
        
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        req.flash('error', 'Failed to remove item from wishlist. Please try again.');
        res.redirect('/cart');
    }
}));

// Clear entire wishlist
router.delete('/clear', isloggedin, wrapAsync(async (req, res) => {
    try {
    const userId = req.user._id.toString();
    
    await cartManager.clearUserWishlist(userId);
    
    req.flash('success', 'Wishlist cleared!');
    res.redirect('/cart');
        
    } catch (error) {
        console.error('Error clearing wishlist:', error);
        req.flash('error', 'Failed to clear wishlist. Please try again.');
        res.redirect('/cart');
    }
}));

// Move item from wishlist to payment
router.post('/buy/:productId', isloggedin, wrapAsync(async (req, res) => {
    try {
    const { productId } = req.params;
    
    // Check if product still exists and is in stock
    const product = await Listing.findById(productId);
    if (!product) {
        req.flash('error', 'Product not found!');
        return res.redirect('/cart');
    }
    
    if (product.stock <= 0) {
        req.flash('error', 'Product is out of stock!');
        return res.redirect('/cart');
    }
    
    // Remove from wishlist and redirect to payment
    const userId = req.user._id.toString();
    await cartManager.removeFromWishlist(userId, productId);
    
    res.redirect(`/payment/${productId}`);
        
    } catch (error) {
        console.error('Error processing wishlist purchase:', error);
        req.flash('error', 'Failed to process purchase. Please try again.');
        res.redirect('/cart');
    }
}));

// Get wishlist count (AJAX endpoint)
router.get('/count', wrapAsync(async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.isAuthenticated() || !req.user || !req.user._id) {
            return res.status(401).json({ error: 'Authentication required', count: 0 });
        }
        
        const userId = req.user._id.toString();
        const count = await cartManager.getUserWishlistCount(userId);
        
        console.log(`Wishlist count for user ${userId}: ${count}`);
        res.json({ count });
    } catch (error) {
        console.error('Error getting wishlist count:', error);
        res.status(500).json({ error: 'Failed to get wishlist count', count: 0 });
    }
}));

module.exports = router; 