const router = require("express").Router();
const {
  signUp,
  logIn,
  forgetPassword,
  verifyResetCode,
  resetPassword,
} = require("../controllers/auth.controller");

const {
  signUpValidator,
  logInValidator,
} = require("../utils/validators/authValidator");

router.post("/signUp", signUpValidator, signUp);

router.post("/logIn", logInValidator, logIn);

router.post("/forgetPassword", forgetPassword);

router.post("/verifyResetCode", verifyResetCode);

router.put("/resetPassword", resetPassword);


module.exports = router;
