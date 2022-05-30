const asyncHandler = require("express-async-handler");

const factory = require("./factoryHandler");
const Review = require("../models/review.model");


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
// @access Private
exports.createReview = factory.createOne(Review);
// @desc Update a review
// @route PUT /api/v1/reviews
// @access Private
exports.updateReview = factory.updateOne(Review);
// @desc Delete a review
// @route DELETE /api/v1/reviews
// @access Private
exports.deleteReview = factory.deleteOne(Review);
