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
  getMe,
  changeMyPassword,
  updateLoggedUser,
  deleteLoggedUser
} = require("../controllers/user.controller");

const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changePasswordValidator,
  updateLoggedUserValidator
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
router.put("/changeMyPassword", auth, changeMyPassword);
router.get("/getMe", auth, getMe, getUser);
router.put('/updateMe', auth, updateLoggedUserValidator, updateLoggedUser)
router.delete('/deleteMe', auth, deleteLoggedUser)
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
