const { check } = require("express-validator");
const ValidatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("This is not a valid ID"),
  ValidatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({ min: 2 })
    .withMessage("Too short subCategory name")
    .isLength({ max: 32 })
    .withMessage("Too long subCategory name"),
  check("category")
    .notEmpty()
    .withMessage("Category must not be empty")
    .isMongoId()
    .withMessage("Please enter a valid id format"),
  ValidatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("This is not a valid ID"),
  check('name').notEmpty().withMessage("name cant be empty"),
  ValidatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("This is not a valid ID"),
  ValidatorMiddleware,
];
