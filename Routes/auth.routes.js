const router = require("express").Router();
const {
  signUp,
  logIn
} = require("../controllers/auth.controller");

const {
  signUpValidator, logInValidator
} = require("../utils/validators/authValidator");

router
  .route("/signUp")
  .post(signUpValidator, signUp);

  router
  .route("/logIn")
  .post(logInValidator, logIn);

// router
//   .route("/:id")
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

module.exports = router;
