const { check } = require("express-validator");
const ValidatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("This is not a valid ID"),
  ValidatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name"),
  ValidatorMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("This is not a valid ID"),
  ValidatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("This is not a valid ID"),
  ValidatorMiddleware,
];
