const BrandModel = require("../models//Brand.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");

class Brand {
  // @desc Get list of Gategories
  // @route GET /api/v1/categories
  // @access Public
  static getBrands = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const brands = await BrandModel.find({}).skip(skip).limit(limit);
    res.status(200).json({ result: brands.length, data: brands });
  });
  // @desc Get Specific brand by id
  // @route GET api/v1/brands/:id
  // @access Public
  static getBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await BrandModel.findById(id);
    if (!brand) {
      return next(new ApiError(`No brand found with the id: ${id}`, 404));
    }
    res.status(200).json({ date: brand });
  });
  // @desc Create a brand
  // @route POST /api/v1/brands
  // @access Private
  static createBrand = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const newBrand = await BrandModel.create({
      name,
      slug: slugify(name),
    });
    await newBrand.save();
    res.status(201).json(newBrand);
  });
  // @desc Update a Brand
  // @route PUT /api/v1/brands
  // @access Private
  static updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const brand = await BrandModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    );
    if (!brand) {
      return next(new ApiError(`No Brand found with the id: ${id}`, 404));
    }
    res.status(200).json({ date: brand });
  });
  // @desc Delete a Brand
  // @route DELETE /api/v1/brands
  // @access Private
  static deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await BrandModel.findByIdAndDelete(id);
    if (!brand) {
      return next(new ApiError(`No brand found with the id: ${id}`, 404));
    }
    res.status(204).json({ date: brand });
  });
}

module.exports = Brand;
