const router = require("express").Router();
const {
  addProductToCart,
  getLoggedUserCart,
  removeCartItem,
  clearUserCart,
  updateCartItmeQuantity,
} = require("../controllers/cart.controller");

const { auth, allowedTo } = require("../controllers/auth.controller");

router.use(auth, allowedTo("user"));

router
  .route("/")
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearUserCart);
router.route("/:id").put(updateCartItmeQuantity).delete(removeCartItem);

// router
//   .route("/:id")
//   .get(getBrandValidator, getBrand)
//   .put(
//     auth,
//     allowedTo("admin", "manager"),
//     uploadBrandImage,
//     resizeImage,
//     updateBrandValidator,
//     updateBrand
//   )
//   .delete(auth, allowedTo("admin"), deleteBrandValidator, deleteBrand);

module.exports = router;
