const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const User = require("../models/user.model");

exports.addAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: req.body },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Address added successfully",
    data: user.addresses,
  });
});

exports.removeAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: req.params.addressId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product added successfully to your wish list",
    data: user.addresses,
  });
});

exports.getLoggedUserAddresses = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('addresses')
    res.status(200).json({
        status: "success",
        result: user.addresses.length,
        data: user.addresses,
      });
})
