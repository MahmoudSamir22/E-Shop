const router = require("express").Router();
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const {
  getReviewValidator,
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/reviewValidator");

const { auth, allowedTo } = require("../controllers/auth.controller");

router.route("/").get(getReviewValidator, getReviews).post(auth, allowedTo("user"), createReviewValidator, createReview);

router
  .route("/:id")
  .get(getReview)
  .put(auth, allowedTo("user"), updateReviewValidator, updateReview)
  .delete(auth, allowedTo("user", "manager", "admin"), deleteReviewValidator, deleteReview);

module.exports = router;
