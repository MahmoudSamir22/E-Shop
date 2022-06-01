const factory = require("./factoryHandler");
const Coupon = require("../models/coupon.model");


// @desc Get list of copouns
// @route GET /api/v1/coupons
// @access Private/Admin/Manger
exports.getCoupons = factory.getAll(Coupon);
// @desc Get Specific copoun by id
// @route GET api/v1/coupons/:id
// @access Private/Admin/Manger
exports.getCoupon = factory.getOne(Coupon);
// @desc Create a copoun
// @route POST /api/v1/coupons
// @access Private/Admin/Manger
exports.createCoupon = factory.createOne(Coupon);
// @desc Update a copoun
// @route PUT /api/v1/coupons
// @access Private/Admin/Manger
exports.updateCoupon = factory.updateOne(Coupon);
// @desc Delete a copoun
// @route DELETE /api/v1/coupons
// @access Private/Admin/Manger
exports.deleteCoupon = factory.deleteOne(Coupon);
