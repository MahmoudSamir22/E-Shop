const router = require("express").Router();
const {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage
} = require("../controllers/category.controller");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");


const subCategoryRoute = require("./subCategory.routes");

router.use("/:categoriesId/subcategories", subCategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(uploadCategoryImage, resizeImage, createCategoryValidator, createCategory);

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(uploadCategoryImage, resizeImage, updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
