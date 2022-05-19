const router = require("express").Router({ mergeParams: true });
const subCategoryController = require("../controllers/subCategory.controller");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

router
  .route("/")
  .post(
    subCategoryController.createCategoryId,
    createSubCategoryValidator,
    subCategoryController.createSubCategory
  )
  .get(
    subCategoryController.createFilterObject,
    subCategoryController.getSubCategory
  );

router
  .route("/:id")
  .get(getSubCategoryValidator, subCategoryController.getSingleSubCategory)
  .put(updateSubCategoryValidator, subCategoryController.updateSubCategory)
  .delete(deleteSubCategoryValidator, subCategoryController.deleteSubCategory);

module.exports = router;
