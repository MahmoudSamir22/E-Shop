const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/user.model");
const bcrypt = require("bcryptjs/dist/bcrypt");

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User required")
    .isLength({ min: 3 })
    .withMessage("Too short User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Password confirmation incorrect");
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation is required"),
  check("phone").optional().isMobilePhone("ar-EG"),
  check("profileImage").optional(),
  check("role").optional(),
  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
      })
    ),
  check("phone").optional().isMobilePhone("ar-EG"),
  check("profileImage").optional(),
  check("role").optional(),
  validatorMiddleware,
];

exports.changePasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("Current password is required"),
  body("password")
    .notEmpty()
    .withMessage("Current password is required")
    .custom(async (val, { req }) => {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("There is no user with this id");
      }
      const isCorrect = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrect) {
        throw new Error("Invalid Current password");
      }
      if (val !== req.body.passwordConfirm) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];
