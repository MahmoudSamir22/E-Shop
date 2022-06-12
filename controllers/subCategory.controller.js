const SubCategory = require("../models/subCategory.model");
const factory = require("./factoryHandler");

//@desc get the category ID
exports.createCategoryId = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoriesId;
  next();
};
exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoriesId) {
    filterObject = { category: req.params.categoriesId };
  }
  req.filter = filterObject;
  next();
};

// @desc Get list of subcategories
// @route GET /api/v1/subcategories
// @access Public
exports.getSubCategories = factory.getAll(SubCategory);
// @desc Get Specific SubCategory by id
// @route GET api/v1/categories/:id
// @access Public
exports.getSubCategory = factory.getOne(SubCategory);
// @desc Create a SubCategory
// @route POST /api/v1/categories
// @access Private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc Update a SubCategory
// @route PUT /api/v1/categories
// @access Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc Delete a SubCategory
// @route DELETE /api/v1/categories
// @access Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
