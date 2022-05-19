const router = require("express").Router();
const brandController = require("../controllers/brand.controller ");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");


router
  .route("/")
  .get(brandController.getBrands)
  .post(createBrandValidator, brandController.createBrand);

router
  .route("/:id")
  .get(getBrandValidator, brandController.getBrand)
  .put(updateBrandValidator, brandController.updateBrand)
  .delete(deleteBrandValidator, brandController.deleteBrand);

module.exports = router;
