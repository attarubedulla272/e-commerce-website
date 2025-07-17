const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { isloggedin, isOwner } = require('../middleware.js');
const listingcontroller = require('../controllers/listings.js');
const multer = require('multer');
const path = require('path');
const productSchema = require('../schemas/listingValidation.js');
const AppError = require('../utils/AppError');

// Use Cloudinary storage for uploads
const { storage } = require('../cloudinary');
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Validation middleware
function validateProduct(req, res, next) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      const msg = error.details.map(el => el.message).join(', ');
      req.flash('error', msg);
      return res.redirect('/listings/new');
    }
    next();
  } catch (error) {
    console.error('Validation error:', error);
    req.flash('error', 'Validation error. Please check your input.');
    res.redirect('/listings/new');
  }
}

// Show all products
router.get('/', wrapAsync(listingcontroller.index));

// Show products by category
router.get('/category/:category', wrapAsync(listingcontroller.index));

// Search products
router.get('/search', wrapAsync(listingcontroller.index));

// Search products within category
router.get('/category/:category/search', wrapAsync(listingcontroller.index));

router.get('/new', isloggedin, listingcontroller.rendernewform);

// Optionally render new form with category preselected
router.get('/category/:category/new', isloggedin, listingcontroller.rendernewformInCategory);

router.post(
  '/',
  isloggedin,
  upload.array('product[images]', 5), // Allow up to 5 images
  validateProduct,
  wrapAsync(listingcontroller.createnewlisting)
);

router.get('/:id', wrapAsync(listingcontroller.showlisting));
router.get('/:id/show', wrapAsync(listingcontroller.showlisting));
router.get('/:id/edit', isloggedin, isOwner, wrapAsync(listingcontroller.editlisting));

router.put('/:id', isloggedin, isOwner, upload.array('product[images]', 5), validateProduct, wrapAsync(listingcontroller.updatelisting));

router.delete('/:id', isloggedin, isOwner, wrapAsync(listingcontroller.deletelisting));

module.exports = router;
