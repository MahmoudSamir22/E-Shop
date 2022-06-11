const router = require("express").Router({ mergeParams: true });
// const express = require("express");
const {
  createCategoryId,
  createFilterObject,
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategory.controller");
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
    createCategoryId,
    createSubCategoryValidator,
    createSubCategory
  )
  .get(
    createFilterObject,
    getSubCategories
  );

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(
    auth,
    allowedTo("admin", "manager"),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    auth,
    allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;
