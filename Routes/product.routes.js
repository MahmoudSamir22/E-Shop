const router = require("express").Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImage,
} = require("../controllers/product.controller");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const { auth, allowedTo } = require("../controllers/auth.controller");
const reviewsRouter = require('./review.routes')

router.use('/:productId/reviews', reviewsRouter)

router
  .route("/")
  .get(getProducts)
  .post(
    auth,
    allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImage,
    createProductValidator,
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    auth,
    allowedTo("admin", "manager"),
    updateProductValidator,
    updateProduct
  )
  .delete(auth, allowedTo("admin"), deleteProductValidator, deleteProduct);

module.exports = router;
