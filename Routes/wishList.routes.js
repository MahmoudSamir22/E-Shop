const router = require("express").Router();
const {
  addProductToWishList,
  removeProductFromWishList,
  getLoggedUserWishList,
} = require("../controllers/wishList.controller");

const { auth, allowedTo } = require("../controllers/auth.controller");

router.use(auth, allowedTo("user"));

router.route("/").post(addProductToWishList).get(getLoggedUserWishList);

router.delete("/:productId", removeProductFromWishList);

module.exports = router;
