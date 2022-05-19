const express = require("express");
require("dotenv").config({ path: "config.env" });
require("./db/dbConnection");
const morgan = require("morgan");
const ApiError = require("./utils/apiErrors");
const globalError = require("./middlewares/errorMiddleware");
const categoryRouter = require("./Routes/category.routes");
const subCategoryRouter = require("./Routes/subCategory.routes");
const brandRouter = require("./Routes/brand.routes");
const productRouter = require("./Routes/product.routes");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use('/api/v1/products', productRouter)
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});
//Global error handling middleware
app.use(globalError);

const server = app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});

//Handle Rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down....");
    process.exit(1);
  });
});
