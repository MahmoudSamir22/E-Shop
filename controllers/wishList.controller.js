const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const User = require("../models/user.model");

// @desc Add a product to the logged user wish list
// @route POST /api/v1/wishList/
// @access Private/User
exports.addProductToWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: req.body.productId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product added successfully to your wish list",
    data: user.wishList,
  });
});
// @desc Get logged user wish list
// @route GET /api/v1/wishList/
// @access Private/User
exports.getLoggedUserWishList = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('wishList')
    res.status(200).json({
        status: "success",
        result: user.wishList.length,
        data: user.wishList,
      });
})
// @desc Remove product from logged user wish list
// @route PUT /api/v1/wishList/:id
// @access Private/User
exports.removeProductFromWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishList: req.params.productId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product removed successfully from your wish list",
    data: user.wishList,
  });
});
