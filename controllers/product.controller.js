const ProductModel = require("../models/product.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const ApiFeatures = require("../utils/apiFeatures");

class Product {
  // @desc Get list of Products
  // @route GET /api/v1/products
  // @access Public
  static getProducts = asyncHandler(async (req, res) => {
    const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
      .paginate()
      .search()
      .filtering()
      .limitFields()
      .sort();
    const products = await apiFeatures.mongooseQuery;
    res.status(200).json({ result: products.length, data: products });
  });
  // @desc Get Specific prodcut by id
  // @route GET api/v1/products/:id
  // @access Public
  static getProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return next(new ApiError(`No product found with the id: ${id}`, 404));
    }
    res.status(200).json({ date: product });
  });
  // @desc Create a Product
  // @route POST /api/v1/products
  // @access Private
  static createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);
    const newProduct = await ProductModel.create(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  });
  // @desc Update a Product
  // @route PUT /api/v1/products
  // @access Private
  static updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.title) req.body.slug = slugify(req.body.title);
    const product = await ProductModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!product) {
      return next(new ApiError(`No product found with the id: ${id}`, 404));
    }
    res.status(200).json({ date: product });
  });
  // @desc Delete a product
  // @route DELETE /api/v1/products
  // @access Private
  static deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return next(new ApiError(`No product found with the id: ${id}`, 404));
    }
    res.status(204).json({ date: product });
  });
}

module.exports = Product;
