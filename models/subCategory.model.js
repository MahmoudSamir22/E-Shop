const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory must be unique"],
      minlength: [2, "to short SubCategory name"],
      maxlength: [32, "to short SubCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category "],
    },
  },
  { timestamps: true }
);

const subCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = subCategory;
