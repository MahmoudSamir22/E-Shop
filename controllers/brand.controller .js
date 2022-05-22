const BrandModel = require("../models//Brand.model");
const factory = require('./factoryHandler')

class Brand {
  // @desc Get list of Gategories
  // @route GET /api/v1/categories
  // @access Public
  static getBrands = factory.getAll(BrandModel)
  // @desc Get Specific brand by id
  // @route GET api/v1/brands/:id
  // @access Public
  static getBrand = factory.getOne(BrandModel)
  // @desc Create a brand
  // @route POST /api/v1/brands
  // @access Private
  static createBrand = factory.createOne(BrandModel)
  // @desc Update a Brand
  // @route PUT /api/v1/brands
  // @access Private
  static updateBrand = factory.updateOne(BrandModel)
  // @desc Delete a Brand
  // @route DELETE /api/v1/brands
  // @access Private
  static deleteBrand = factory.deleteOne(BrandModel)
}

module.exports = Brand;
