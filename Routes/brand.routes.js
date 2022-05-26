const router = require("express").Router();
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../controllers/brand.controller ");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");

const { auth, allowedTo } = require("../controllers/auth.controller");

router
  .route("/")
  .get(getBrands)
  .post(
    auth,
    allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  );

router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(
    auth,
    allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(auth, allowedTo("admin"), deleteBrandValidator, deleteBrand);

module.exports = router;
