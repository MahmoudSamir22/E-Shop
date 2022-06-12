const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const ApiError = require("../utils/apiErrors");
const factory = require("./factoryHandler");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const { generateToken } = require("../middlewares/generateToken");
const User = require("../models//user.model");
const { findByIdAndUpdate } = require("../models//user.model");

// Image Proccessing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${fileName}`);

    req.body.profileImage = fileName;
  }

  next();
});

// Image Upload
exports.uploadUserImage = uploadSingleImage("profileImage");

// @desc Get list of Users
// @route GET /api/v1/users
// @access Private
exports.getUsers = factory.getAll(User);
// @desc Get Specific user by id
// @route GET api/v1/users/:id
// @access Private/Admin
exports.getUser = factory.getOne(User);
// @desc Create a user
// @route POST /api/v1/users
// @access Private/Admin
exports.createUser = factory.createOne(User);
// @desc Update a user
// @route PUT /api/v1/users
// @access Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      profileImage: req.body.profileImage,
      phone: req.body.phone,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(
      new ApiError(`No document found with the id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: document });
});
// @desc Change user password
// @route PUT /api/v1/users/changePassword
// @access Private
exports.changePassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 8),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(
      new ApiError(`No document found with the id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: document });
});
// @desc Delete a user
// @route DELETE /api/v1/users
// @access Private
exports.deleteUser = factory.deleteOne(User);

// @desc Get logged user data
// @route GET api/v1/users/getMe
// @access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc Change user password
// @route PUT /api/v1/users/changePassword
// @access Private
exports.changeMyPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 8),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(
      new ApiError(`No document found with the id: ${req.params.id}`, 404)
    );
  }
  const token = generateToken(req.user._id);
  res.status(200).json({ data: document, token });
});
// @desc Update logged user
// @route PUT /api/v1/users/updateMe
// @access Private/Admin
exports.updateLoggedUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    },
    { new: true }
  );
  res.status(200).json({data: user});
});

// @desc Delete logged user
// @route DELETE /api/v1/users/deleteMe
// @access Private/Admin
exports.deleteLoggedUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, {active: false}, {new: true})
  res.status(200).json({data: user});
})
