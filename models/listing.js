const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const imageSchema = new Schema({
  url: String,
  filename: String
});

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  images: [imageSchema],
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  brand: String,
  seller: { type: Schema.Types.ObjectId, ref: "User" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  category: {
    type: String,
    enum: [
      "Electronics", "Clothing", "Home & Garden", "Sports", "Books",
      "Beauty & Health", "Toys & Games", "Automotive", "Jewelry",
      "Pet Supplies", "Office Supplies", "Baby Products"
    ]
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

productSchema.post('findOneAndDelete', async (product) => {
  if (product) {
    await Review.deleteMany({ _id: { $in: product.reviews } });
  }
});

module.exports = mongoose.model("Product", productSchema);
