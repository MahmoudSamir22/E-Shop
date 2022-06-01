const mongoose = require("mongoose");
const Product = require("./product.model");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    rating: {
      type: Number,
      min: [1, "Min Rating is 1.0"],
      max: [5, , "Max Rating is 5.0"],
      required: [true, "Reciew Rating is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name" });
  next();
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
  productId
) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "product",
        avgRating: { $avg: "$rating" },
        raitingsQuantity: { $sum: 1 },
      },
    },
  ]);
  console.log(result);

  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rateingsAverage: result[0].avgRating,
      ratingsQuantity: result[0].raitingsQuantity,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      rateingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.post("remove", async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
