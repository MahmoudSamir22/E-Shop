const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const factory = require("./factoryHandler");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const User = require("../models//user.model");

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
// @access Private
exports.getUser = factory.getOne(User);
// @desc Create a user
// @route POST /api/v1/users
// @access Private
exports.createUser = factory.createOne(User);
// @desc Update a user
// @route PUT /api/v1/users
// @access Private
exports.updateUser = factory.updateOne(User);
// @desc Delete a user
// @route DELETE /api/v1/users
// @access Private
exports.deleteUser = factory.deleteOne(User);
