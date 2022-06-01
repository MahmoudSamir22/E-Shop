const router = require("express").Router({ mergeParams: true });
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  createFilterObject,
  createProductIdAndUserId,
} = require("../controllers/review.controller");
const {
  getReviewValidator,
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/reviewValidator");

const { auth, allowedTo } = require("../controllers/auth.controller");

router
  .route("/")
  .get(createFilterObject, getReviews)
  .post(
    auth,
    allowedTo("user"),
    createProductIdAndUserId,
    createReviewValidator,
    createReview
  );

router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .put(auth, allowedTo("user"), updateReviewValidator, updateReview)
  .delete(
    auth,
    allowedTo("user", "manager", "admin"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
