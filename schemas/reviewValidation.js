// schemas/reviewValidation.js
const Joi = require('joi');

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required().max(1000)
  }).required()
});

module.exports = reviewSchema;
