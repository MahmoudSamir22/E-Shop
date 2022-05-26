const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changePassword,
} = require("../controllers/user.controller");

const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changePasswordValidator,
} = require("../utils/validators/userValidator");

router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);

router.put('/changePassword/:id', changePasswordValidator ,changePassword)

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
