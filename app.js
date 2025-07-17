if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}



const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const AppError = require('./utils/AppError');
const productsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const userrouter = require("./routes/users.js");
const paymentRouter = require("./routes/payment.js");
const ordersRouter = require("./routes/orders.js");
const cartRouter = require("./routes/cart.js");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require("./models/user.js");

// Session store for better session management
const MongoStore = require('connect-mongo');

const app = express();

// DB connect
mongoose.connect('mongodb://127.0.0.1:27017/ShopHub')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// View engine & middleware
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionOptions = {
    secret: "Mysupersecretcode",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/ShopHub',
        touchAfter: 24 * 3600, // 24 hours
        crypto: {
            secret: 'mysupersecretcode'
        }
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
};

app.use(session(sessionOptions));
app.use(flash());

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash & current user middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    
    // Refresh session on user activity
    if (req.session && req.user) {
        req.session.touch();
    }
    
    next();
});

// Routes
app.use('/listings', productsRouter);
app.use('/listings/:id/reviews', reviewsRouter);
app.use('/payment', paymentRouter);
app.use('/orders', ordersRouter);
app.use('/cart', cartRouter);
app.use('/', userrouter);

// Catch-all 404 handler
app.all('*', (req, res, next) => {
  next(new AppError('Page not found!', 404));
});

// Error handler
app.use((err, req, res, next) => {
    if (err.status >= 500 || !err.status) {
        console.error(err);
    }
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).render('error', {
        err: {
            statusCode: status,
            message: message
        }
    });
});

// Start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
