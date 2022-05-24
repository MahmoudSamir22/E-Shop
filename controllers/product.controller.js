const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const multer = require("multer");

const ApiError = require("../utils/apiErrors");
const factory = require("./factoryHandler");
const Product = require("../models/product.model");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Images only supported", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadProductImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

// *Important* ==> comment the resize code and try it

// Image Proccessing
exports.resizeProductImage = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverName = `product-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${imageCoverName}`);

    req.body.imagecover = imageCoverName;
  }
  if (req.files.images) {
    let images = [];
    req.files.images.map(async (img, index) => {
      const imgName = `product-${uuidv4()}-${Date.now()}-${index}.jpeg`;
      await sharp(img.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/products/${imgName}`);

      images.push(imgName);
    });
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
exports.getProduct = factory.getOne(Product);
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
