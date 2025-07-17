const Joi = require('joi');

const productSchema = Joi.object({
  product: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('').max(2000),
    price: Joi.number().required().min(0),
    originalPrice: Joi.number().required().min(0),
    stock: Joi.number().required().min(0),
    brand: Joi.string().allow(''),
    category: Joi.string().valid(
      "Electronics", "Clothing", "Home & Garden", "Sports", "Books",
      "Beauty & Health", "Toys & Games", "Automotive", "Jewelry",
      "Pet Supplies", "Office Supplies", "Baby Products"
    ).required()
  }).required()
});

module.exports = productSchema;
