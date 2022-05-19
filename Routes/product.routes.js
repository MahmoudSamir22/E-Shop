const router = require("express").Router();
const productController = require("../controllers/product.controller");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");


router
  .route("/")
  .get(productController.getProducts)
  .post(createProductValidator, productController.createProduct);

router
  .route("/:id")
  .get(getProductValidator, productController.getProduct)
  .put(updateProductValidator, productController.updateProduct)
  .delete(deleteProductValidator, productController.deleteProduct);

module.exports = router;
