const express = require('express');
const router = express.Router();
const { isloggedin } = require('../middleware');

// Orders page route
router.get('/', isloggedin, (req, res) => {
    res.render('orders/index');
});

module.exports = router; 