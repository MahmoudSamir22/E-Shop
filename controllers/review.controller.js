const asyncHandler = require("express-async-handler");

const factory = require("./factoryHandler");
const Review = require("../models/review.model");

exports.createProductIdAndUserId = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) {
    filterObject = { product: req.params.productId };
  }
  req.filter = filterObject;
  next();
};

// @desc Get list of reviews
// @route GET /api/v1/reviews
// @access Public
exports.getReviews = factory.getAll(Review);
// @desc Get Specific review by id
// @route GET api/v1/reviews/:id
// @access Public
exports.getReview = factory.getOne(Review);
// @desc Create a review
// @route POST /api/v1/reviews
// @access Private/User
exports.createReview = factory.createOne(Review);
// @desc Update a review
// @route PUT /api/v1/reviews
// @access Private/User
exports.updateReview = factory.updateOne(Review);
// @desc Delete a review
// @route DELETE /api/v1/reviews
// @access Private/Admin/Manger
exports.deleteReview = factory.deleteOne(Review);
