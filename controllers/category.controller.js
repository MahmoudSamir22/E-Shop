const CategoryModel = require("../models/category.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");

class Category {
  // @desc Get list of Gategories
  // @route GET /api/v1/categories
  // @access Public
  static getCategory = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const categories = await CategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({ result: categories.length, data: categories });
  });
  // @desc Get Specific category by id
  // @route GET api/v1/categories/:id
  // @access Public
  static getSingleCategory = asyncHandler(async (req, res, next) => {
    console.log("start");
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
      return next(new ApiError(`No Category found with the id: ${id}`, 404));
    }
    res.status(200).json({ date: category });
  });
  // @desc Create a Category
  // @route POST /api/v1/categories
  // @access Private
  static createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const newCategory = await CategoryModel.create({
      name,
      slug: slugify(name),
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  });
  // @desc Update a Category
  // @route PUT /api/v1/categories
  // @access Private
  static updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await CategoryModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    );
    if (!category) {
      return next(new ApiError(`No Category found with the id: ${id}`, 404));
    }
    res.status(200).json({ date: category });
  });
  // @desc Delete a Category
  // @route DELETE /api/v1/categories
  // @access Private
  static deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      return next(new ApiError(`No Category found with the id: ${id}`, 404));
    }
    res.status(204).json({ date: category });
  });
}

module.exports = Category;
