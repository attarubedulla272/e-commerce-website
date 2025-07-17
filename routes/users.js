// routes/users.js
const express = require("express");
const router = express.Router();
const passport = require('passport');
const { saveredirecturl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/user.js");

// Show signup form
router.get('/signup', userController.renderSignupForm);

// Handle signup logic
router.post('/signup', wrapAsync(userController.signup));

// Show login form
router.get('/login', userController.login);

// Handle login logic
router.post('/login',
    saveredirecturl,
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }),
    (req, res) => {
        req.flash('success', 'Welcome back to ShopHub!');
        const redirectUrl = req.session.redirectUrl || '/listings';
        delete req.session.redirectUrl;   // ✅ clear after using
        res.redirect(redirectUrl);
    }
);

// Handle logout
router.get('/logout', userController.logoutForm);

module.exports = router;
