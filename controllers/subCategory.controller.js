const SubCategoryModel = require("../models/subCategory.model");
const factory = require("./factoryHandler");

class SubCategory {
  //@desc get the category ID
  static createCategoryId = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoriesId;
    next();
  };
  static createFilterObject = (req, res, next) => {
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
  static getSubCategories = factory.getAll(SubCategoryModel);
  // @desc Get Specific SubCategory by id
  // @route GET api/v1/categories/:id
  // @access Public
  static getSubCategory = factory.getOne(SubCategoryModel);
  // @desc Create a SubCategory
  // @route POST /api/v1/categories
  // @access Private
  static createSubCategory = factory.createOne(SubCategoryModel);

  // @desc Update a SubCategory
  // @route PUT /api/v1/categories
  // @access Private
  static updateSubCategory = factory.updateOne(SubCategoryModel);

  // @desc Delete a SubCategory
  // @route DELETE /api/v1/categories
  // @access Private
  static deleteSubCategory = factory.deleteOne(SubCategoryModel);
}

module.exports = SubCategory;
