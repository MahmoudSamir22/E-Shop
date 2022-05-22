const CategoryModel = require("../models/category.model");
const factory = require('./factoryHandler')

class Category {
  // @desc Get list of Gategories
  // @route GET /api/v1/categories
  // @access Public
  static getCategories = factory.getAll(CategoryModel)
  // @desc Get Specific category by id
  // @route GET api/v1/categories/:id
  // @access Public
  static getCategory = factory.getOne(CategoryModel)
  // @desc Create a Category
  // @route POST /api/v1/categories
  // @access Private
  static createCategory = factory.createOne(CategoryModel)
  // @desc Update a Category
  // @route PUT /api/v1/categories
  // @access Private
  static updateCategory = factory.updateOne(CategoryModel)
  // @desc Delete a Category
  // @route DELETE /api/v1/categories
  // @access Private
  static deleteCategory = factory.deleteOne(CategoryModel)
}

module.exports = Category;
