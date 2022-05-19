const { check } = require("express-validator");
const ValidatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("This is not a valid ID"),
  ValidatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  ValidatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("This is not a valid ID"),
  ValidatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("This is not a valid ID"),
  ValidatorMiddleware,
];
