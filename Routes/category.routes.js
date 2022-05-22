const router = require("express").Router();
const categoryController = require("../controllers/category.controller");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const subCategoryRoute = require("./subCategory.routes")

router.use('/:categoriesId/subcategories', subCategoryRoute)

router
  .route("/")
  .get(categoryController.getCategories)
  .post(createCategoryValidator, categoryController.createCategory);

router
  .route("/:id")
  .get(getCategoryValidator, categoryController.getCategory)
  .put(updateCategoryValidator, categoryController.updateCategory)
  .delete(deleteCategoryValidator, categoryController.deleteCategory);

module.exports = router;
