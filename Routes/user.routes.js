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

const { auth, allowedTo } = require("../controllers/auth.controller");

router
  .route("/")
  .get(auth, allowedTo("admin"), getUsers)
  .post(
    auth,
    allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser
  );

router.put("/changePassword/:id", changePasswordValidator, changePassword);

router
  .route("/:id")
  .get(auth, allowedTo("admin"), getUserValidator, getUser)
  .put(
    auth,
    allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    updateUserValidator,
    updateUser
  )
  .delete(auth, allowedTo("admin"), deleteUserValidator, deleteUser);

module.exports = router;
