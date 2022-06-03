const router = require("express").Router();
const {
  createCashOrder,
  filterOrderLoggedUser,
  findAllOrders,
  findOrder,
  updadeOrderToPaid,
  updadeOrderToDeliverd,
} = require("../controllers/order.controller");

const { auth, allowedTo } = require("../controllers/auth.controller");

router.use(auth);

router
  .route("/")
  .get(
    allowedTo("user", "admin", "manager"),
    filterOrderLoggedUser,
    findAllOrders
  );

router
  .route("/:id")
  .get(allowedTo("user", "admin", "manager"), filterOrderLoggedUser, findOrder);

router.put("/:id/pay", allowedTo("admin", "manager"), updadeOrderToPaid);

router.put("/:id/deliver", allowedTo("admin", "manager"), updadeOrderToDeliverd);

router.route("/:cartId").post(allowedTo("user"), createCashOrder);

module.exports = router;
