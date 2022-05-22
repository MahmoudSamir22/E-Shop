const ProductModel = require("../models/product.model");
const factory = require('./factoryHandler')

class Product {
  // @desc Get list of Products
  // @route GET /api/v1/products
  // @access Public
  static getProducts = factory.getAll(ProductModel, 'Products')
  // @desc Get Specific prodcut by id
  // @route GET api/v1/products/:id
  // @access Public
  static getProduct = factory.getOne(ProductModel)
  // @desc Create a Product
  // @route POST /api/v1/products
  // @access Private
  static createProduct = factory.createOne(ProductModel)
  // @desc Update a Product
  // @route PUT /api/v1/products
  // @access Private
  static updateProduct = factory.updateOne(ProductModel)
  // @desc Delete a product
  // @route DELETE /api/v1/products
  // @access Private
  static deleteProduct = factory.deleteOne(ProductModel)
}

module.exports = Product;
