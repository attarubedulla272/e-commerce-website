const Product = require('../models/listing.js');
const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

// Show all products or by category with search functionality
module.exports.index = async (req, res) => {
  const { category } = req.params;
  const { q: searchQuery } = req.query; // Get search query from GET parameters
  let allProducts;
  let query = { isActive: true };

  // Add category filter if provided
  if (category) {
    query.category = category;
  }

  // Add search functionality
  if (searchQuery && searchQuery.trim()) {
    query.$or = [
      { name: { $regex: searchQuery.trim(), $options: 'i' } },
      { description: { $regex: searchQuery.trim(), $options: 'i' } },
      { brand: { $regex: searchQuery.trim(), $options: 'i' } },
      { category: { $regex: searchQuery.trim(), $options: 'i' } }
    ];
  }

  allProducts = await Product.find(query);
  res.render("listing/index.ejs", { 
    allProducts, 
    currentCategory: category || null,
    searchQuery: searchQuery || null
  });
};

module.exports.rendernewform = (req, res) => {
  res.render("listing/new.ejs", { category: null });
};

module.exports.rendernewformInCategory = (req, res) => {
  const { category } = req.params;
  res.render("listing/new.ejs", { category });
};

module.exports.createnewlisting = async (req, res) => {
  try {
    const newProduct = new Product(req.body.product);
    newProduct.seller = req.user._id;

    // Handle file uploads
    if (req.files && req.files.length > 0) {
      newProduct.images = req.files.map(file => ({
        url: file.path, // Use Cloudinary URL
        filename: file.filename
      }));
    }

    await newProduct.save();
    req.flash('success', 'New product added successfully!');
    res.redirect(`/listings/${newProduct._id}`);
  } catch (error) {
    console.error('Error creating new listing:', error);
    
    // Clean up uploaded files if there was an error
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        const fs = require('fs');
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    
    req.flash('error', 'Failed to create new product. Please try again.');
    res.redirect('/listings/new');
  }
};

module.exports.showlisting = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", "Invalid product ID");
      return res.redirect("/listings");
    }
    
    const product = await Product.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("seller");

    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/listings");
    }
    
    if (!product.isActive) {
      req.flash("error", "Product is not available");
      return res.redirect("/listings");
    }
    
    res.render("listing/show.ejs", { product });
  } catch (error) {
    console.error('Error fetching product:', error);
    req.flash("error", "Error loading product");
    res.redirect("/listings");
  }
};

module.exports.editlisting = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) throw new AppError("Product not found", 404);
  res.render("listing/edit.ejs", { product, category: product.category });
};

module.exports.updatelisting = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body.product;

    // Handle file uploads
    if (req.files && req.files.length > 0) {
      updatedData.images = req.files.map(file => ({
        url: file.path, // Use Cloudinary URL
        filename: file.filename
      }));
    }

    await Product.findByIdAndUpdate(id, updatedData);
    req.flash('success', 'Product updated successfully!');
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.error('Error updating listing:', error);
    
    // Clean up uploaded files if there was an error
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        const fs = require('fs');
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    
    req.flash('error', 'Failed to update product. Please try again.');
    res.redirect(`/listings/${req.params.id}/edit`);
  }
};

module.exports.deletelisting = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  req.flash('success', 'Product deleted successfully!');
  res.redirect('/listings');
};
