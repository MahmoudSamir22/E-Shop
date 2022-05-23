const Category = require("../models/category.model");
const factory = require("./factoryHandler");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const ApiError = require("../utils/apiErrors");

// 1) Disk Storage
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `category-${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Images only supported", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadCategoryImage = upload.single("image");

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
