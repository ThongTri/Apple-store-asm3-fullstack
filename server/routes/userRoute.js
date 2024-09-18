const express = require("express");
const userController = require("../controllers/userController");

const route = express.Router();

route.post("/signup", userController.signup);
route.post("/login", userController.login);
route.get("/logout", userController.logout);
route.get("/auto-login", userController.autoLogin);

route
  .route("/cart/:productId")
  .post(userController.protectRoute, userController.addOneProductToCart)
  .delete(userController.protectRoute, userController.deleteOneProductFromCart);

route.route("/cart").get(userController.protectRoute, userController.getCart);

route.route("/admin/login").post(userController.adminLogin);
route.get("/admin/auto-login", userController.autoLogin);
route.get(
  "/admin",
  userController.protectRoute,
  userController.restrictTo("admin"),
  userController.getAllUser
);

module.exports = route;
