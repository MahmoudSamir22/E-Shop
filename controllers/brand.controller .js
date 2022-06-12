const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const factory = require("./factoryHandler");
const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware')
const Brand = require("../models/Brand.model");

// Image Proccessing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${fileName}`);

  req.body.image = fileName

  next();
});

// Image Upload
exports.uploadBrandImage = uploadSingleImage('image')

// @desc Get list of brans
// @route GET /api/v1/brands
// @access Public
exports.getBrands = factory.getAll(Brand);
// @desc Get Specific brand by id
// @route GET api/v1/brands/:id
// @access Public
exports.getBrand = factory.getOne(Brand);
// @desc Create a brand
// @route POST /api/v1/brands
// @access Private/Admin/Manger
exports.createBrand = factory.createOne(Brand);
// @desc Update a Brand
// @route PUT /api/v1/brands
// @access Private/Admin/Manger
exports.updateBrand = factory.updateOne(Brand);
// @desc Delete a Brand
// @route DELETE /api/v1/brands
// @access Private/Admin/Manger
exports.deleteBrand = factory.deleteOne(Brand);
