const categoryRouter = require("./category.routes");
const subCategoryRouter = require("./subCategory.routes");
const brandRouter = require("./brand.routes");
const productRouter = require("./product.routes");
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const reviewRouter = require("./review.routes");
const wishListRouter = require("./wishList.routes");
const addressesRouter = require("./addresses.routes");
const couponRouter = require("./coupon.routes");
const cartRouter = require("./cart.routes");
const orderRouter = require("./order.routes");


const mountRoutes = (app) => {
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subCategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/wishList", wishListRouter);
  app.use("/api/v1/addresses", addressesRouter);
  app.use("/api/v1/coupons", couponRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/orders", orderRouter);
};

module.exports = mountRoutes