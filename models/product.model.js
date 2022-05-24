const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Too short title"],
      maxlength: [100, "Too long title"],
    },
    slug: {
      type: "string",
      required: true,
      lowercase: true,
    },
    description: {
      type: "string",
      required: [true, "Description is required"],
      minlength: [20, "Too short description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantitiy is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      maxlength: [20, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    rateingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal to 1.0"],
      max: [5, "Rating must be below or equal to 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.pre(/^find/, function (next) {
  this.populate({ path: "category", select: "name -_id" });
  next()
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel
