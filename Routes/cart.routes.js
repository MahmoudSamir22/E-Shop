const router = require("express").Router();
const {
  addProductToCart,
  getLoggedUserCart,
  removeCartItem,
  clearUserCart,
  updateCartItmeQuantity,
  applyCoupon,
} = require("../controllers/cart.controller");

const { auth, allowedTo } = require("../controllers/auth.controller");

router.use(auth, allowedTo("user"));
router.put("/applyCoupon", applyCoupon);

router
  .route("/")
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearUserCart);
router.route("/:id").put(updateCartItmeQuantity).delete(removeCartItem);

module.exports = router;
