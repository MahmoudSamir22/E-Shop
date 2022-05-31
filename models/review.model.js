const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    rating: {
      type: Number,
      min: [1, "Min Rating is 1.0"],
      max: [5, , "Max Rating is 5.0"],
      required: [true, 'Reciew Rating is required']
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
  this.populate({path: 'user', select: 'name'})
  next()
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
