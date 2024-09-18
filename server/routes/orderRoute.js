const express = require("express");
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");

const route = express.Router();
//admin
route.get(
  "/admin",
  userController.protectRoute,
  userController.restrictTo("saler", "admin"),
  orderController.getAllOrders
);

route.post("/", userController.protectRoute, orderController.createOrder);
route.get("/", userController.protectRoute, orderController.getClientOrders);
route.get(
  "/:orderId",
  userController.protectRoute,
  orderController.getClientDetailOrder
);

module.exports = route;
