const router = require("express").Router({ mergeParams: true });
// const express = require("express");
const subCategoryController = require("../controllers/subCategory.controller");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const { auth, allowedTo } = require("../controllers/auth.controller");

router
  .route("/")
  .post(
    auth,
    allowedTo("admin", "manager"),
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
  .put(
    auth,
    allowedTo("admin", "manager"),
    updateSubCategoryValidator,
    subCategoryController.updateSubCategory
  )
  .delete(
    auth,
    allowedTo("admin"),
    deleteSubCategoryValidator,
    subCategoryController.deleteSubCategory
  );

module.exports = router;
