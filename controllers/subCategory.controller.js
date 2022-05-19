const SubCategoryModel = require("../models/subCategory.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");

class SubCategory {
  //@desc get the category ID
  static createCategoryId = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoriesId;
    next();
  };
  static createFilterObject = (req, res, next) => {
    const filterObject = {};
    if (req.params.categoryId)
      filterObject = { category: req.query.categoryId };
    req.filter = filterObject;
    next();
  };
  // @desc Create a SubCategory
  // @route POST /api/v1/categories
  // @access Private
  static createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = await SubCategoryModel.create({
      name,
      slug: slugify(name),
      category,
    });
    await subCategory.save();
    res.status(201).json({ data: subCategory });
  });

  // @desc Get list of subcategories
  // @route GET /api/v1/subcategories
  // @access Public
  static getSubCategory = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const subCategories = await SubCategoryModel.find(req.filter)
      .skip(skip)
      .limit(limit)
      .populate({ path: "category", select: "name" });
    res.status(200).json({ result: subCategories.length, data: subCategories });
  });
  // @desc Get Specific SubCategory by id
  // @route GET api/v1/categories/:id
  // @access Public
  static getSingleSubCategory = asyncHandler(async (req, res, next) => {
    console.log("start");
    const { id } = req.params;
    const subCategory = await SubCategoryModel.findById(id);
    if (!subCategory) {
      return next(new ApiError(`No SubCategory found with the id: ${id}`, 404));
    }
    res.status(200).json({ date: subCategory });
  });
  // @desc Update a SubCategory
  // @route PUT /api/v1/categories
  // @access Private
  static updateSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, category } = req.body;
    const subCategory = await SubCategoryModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name), category },
      { new: true }
    );
    if (!subCategory) {
      return next(new ApiError(`No SubCategory found with the id: ${id}`, 404));
    }
    res.status(200).json({ date: subCategory });
  });
  // @desc Delete a SubCategory
  // @route DELETE /api/v1/categories
  // @access Private
  static deleteSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategoryModel.findByIdAndDelete(id);
    if (!subCategory) {
      return next(
        new ApiError(`No Sub Category found with the id: ${id}`, 404)
      );
    }
    res.status(204).json({ date: subCategory });
  });
}

module.exports = SubCategory;
