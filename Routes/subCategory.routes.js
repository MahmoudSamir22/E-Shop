const router = require("express").Router({ mergeParams: true });
// const express = require("express");
const subCategoryController = require("../controllers/subCategory.controller");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

// const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    subCategoryController.createCategoryId,
    createSubCategoryValidator,
    subCategoryController.createSubCategory
  )
  .get(
    subCategoryController.createFilterObject,
    subCategoryController.getSubCategories
  );

router
  .route("/:id")
  .get(getSubCategoryValidator, subCategoryController.getSubCategory)
  .put(updateSubCategoryValidator, subCategoryController.updateSubCategory)
  .delete(deleteSubCategoryValidator, subCategoryController.deleteSubCategory);

module.exports = router;
