const router = require("express").Router();
const categoryController = require("../controllers/category.controller");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const subCategoryRoute = require("./subCategory.routes")

router.use('/:categoriesId/subCategories', subCategoryRoute)

router
  .route("/")
  .get(categoryController.getCategory)
  .post(createCategoryValidator, categoryController.createCategory);

router
  .route("/:id")
  .get(getCategoryValidator, categoryController.getSingleCategory)
  .put(updateCategoryValidator, categoryController.updateCategory)
  .delete(deleteCategoryValidator, categoryController.deleteCategory);

module.exports = router;
