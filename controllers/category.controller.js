const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const factory = require("./factoryHandler");
const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware')
const Category = require("../models/category.model");

// Image Proccessing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
  // console.log(req.file);
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${fileName}`);

  req.body.image = fileName

  next();
});

// Image Upload
exports.uploadCategoryImage = uploadSingleImage('image')

// @desc Get list of Gategories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = factory.getAll(Category);
// @desc Get Specific category by id
// @route GET api/v1/categories/:id
// @access Public
exports.getCategory = factory.getOne(Category);
// @desc Create a Category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = factory.createOne(Category);
// @desc Update a Category
// @route PUT /api/v1/categories
// @access Private
exports.updateCategory = factory.updateOne(Category);
// @desc Delete a Category
// @route DELETE /api/v1/categories
// @access Private
exports.deleteCategory = factory.deleteOne(Category);
