const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync');
const { isloggedin } = require('../middleware');

// Payment page route
router.get('/:id', isloggedin, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('seller');
    
    if (!listing) {
        req.flash('error', 'Product not found!');
        return res.redirect('/listings');
    }
    
    if (listing.stock <= 0) {
        req.flash('error', 'Product is out of stock!');
        return res.redirect(`/listings/${id}`);
    }
    
    res.render('payment/index', { listing });
}));

// Process payment route
router.post('/:id/process', isloggedin, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { paymentMethod, cardNumber, expiryDate, cvv, billingAddress } = req.body;
    
    const listing = await Listing.findById(id);
    
    if (!listing) {
        req.flash('error', 'Product not found!');
        return res.redirect('/listings');
    }
    
    if (listing.stock <= 0) {
        req.flash('error', 'Product is out of stock!');
        return res.redirect(`/listings/${id}`);
    }
    
    // Simulate payment processing
    try {
        // Here you would integrate with a real payment gateway
        // For now, we'll simulate a successful payment
        
        // Update stock
        listing.stock -= 1;
        await listing.save();
        
        req.flash('success', 'Payment successful! Your order has been placed.');
        res.redirect('/orders');
    } catch (error) {
        req.flash('error', 'Payment failed. Please try again.');
        res.redirect(`/payment/${id}`);
    }
}));

module.exports = router; 