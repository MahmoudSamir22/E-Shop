const path = require("path");

const express = require("express");
require("dotenv").config({ path: "config.env" });
const morgan = require("morgan");

require("./db/dbConnection");
const ApiError = require("./utils/apiErrors");
const globalError = require("./middlewares/errorMiddleware");
const mountRoutes = require('./Routes')

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
mountRoutes(app)
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
