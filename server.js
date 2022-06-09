const path = require("path");

const express = require("express");
require("dotenv").config({ path: "config.env" });
const morgan = require("morgan");
const cors = require('cors')
const compression = require('compression')

const dbConnection = require("./db/dbConnection");
const ApiError = require("./utils/apiErrors");
const globalError = require("./middlewares/errorMiddleware");
const mountRoutes = require('./Routes')
const {webhookCheckOut} = require('./controllers/order.controller')

const port = process.env.PORT || 3000;

dbConnection()

const app = express();
// Enable other domains to access your application
app.use(cors())
app.options('*', cors())

// compress all responses
app.use(compression())

//Check out web hook
app.post('/webhook-checkout', express.raw({type: 'application/json'}), webhookCheckOut)


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
