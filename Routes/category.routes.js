const router = require("express").Router();
const {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../controllers/category.controller");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const { auth, allowedTo } = require("../controllers/auth.controller");

const subCategoryRoute = require("./subCategory.routes");

router.use("/:categoriesId/subcategories", subCategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    auth,
    allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(
    auth,
    allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(auth, allowedTo("admin"), deleteCategoryValidator, deleteCategory);

module.exports = router;
