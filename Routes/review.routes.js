const router = require("express").Router();
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
// const {
//   getBrandValidator,
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
// } = require("../utils/validators/brandValidator");

const { auth, allowedTo } = require("../controllers/auth.controller");

router.route("/").get(getReviews).post(auth, allowedTo("user"), createReview);

router
  .route("/:id")
  .get(getReview)
  .put(auth, allowedTo("user"), updateReview)
  .delete(auth, allowedTo("user", "manager", "admin"), deleteReview);

module.exports = router;
