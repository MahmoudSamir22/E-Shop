const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const multer = require("multer");

const {uploadMixOfImages} = require('../middlewares/uploadImageMiddleware')
const factory = require("./factoryHandler");
const Product = require("../models/product.model");


exports.uploadProductImages = uploadMixOfImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

// *Important* ==> comment the resize code and try it

// Image Proccessing
exports.resizeProductImage = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverName = `product-cover-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${imageCoverName}`);

    req.body.imageCover = imageCoverName;
  }
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imgName = `product-image-${uuidv4()}-${Date.now()}-${index}.jpeg`;
        await sharp(img.buffer)
          .resize(600, 600)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${imgName}`);

        req.body.images.push(imgName);
      })
    );
  }
  next();
});

// @desc Get list of Products
// @route GET /api/v1/products
// @access Public
exports.getProducts = factory.getAll(Product, "Products");
// @desc Get Specific prodcut by id
// @route GET api/v1/products/:id
// @access Public
exports.getProduct = factory.getOne(Product, 'reviews');
// @desc Create a Product
// @route POST /api/v1/products
// @access Private
exports.createProduct = factory.createOne(Product);
// @desc Update a Product
// @route PUT /api/v1/products
// @access Private
exports.updateProduct = factory.updateOne(Product);
// @desc Delete a product
// @route DELETE /api/v1/products
// @access Private
exports.deleteProduct = factory.deleteOne(Product);
