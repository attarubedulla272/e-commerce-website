const mongoose=require("mongoose");
const passport = require('passport');
const User = require("../models/user.js");



module.exports.renderSignupForm=(req, res) => {
    // If user is already logged in, redirect to listings
    if (req.isAuthenticated()) {
        req.flash('info', 'You are already logged in!');
        return res.redirect('/listings');
    }
    res.render("listing/users/signup.ejs");
}

module.exports.signup=async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            req.flash("error", "Username already taken. Please choose another.");
            return res.redirect("/signup");
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            req.flash("error", "Email already registered. Please use another email.");
            return res.redirect("/signup");
        }

        // Create and register user
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        // Log user in immediately after signup
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to ShopHub!");
            res.redirect("/listings");
        });

    } catch (e) {
        console.error(e);
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}
module.exports.login=(req, res) => {
    // If user is already logged in, redirect to listings
    if (req.isAuthenticated()) {
        req.flash('info', 'You are already logged in!');
        return res.redirect('/listings');
    }
    res.render("listing/users/login.ejs");
}
module.exports.logoutForm=(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            console.error(err); // log error
            req.flash('error', 'Something went wrong while logging out.');
            return res.redirect('/listings');
        }
        // Set flash message BEFORE destroying session
        req.flash('success', 'You are logged out');
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.redirect('/listings');
        });
    });
}