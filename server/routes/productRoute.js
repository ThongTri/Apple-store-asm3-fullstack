const express = require("express");
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/product"); // Save files to this directory
  },
  filename: function (req, file, cb) {
    cb(null, `product-${Date.now()}-${file.originalname}`); // Customize file name
  },
});

const upload = multer({ storage });

const route = express.Router();

//https://localhost:5000/product/
route.get("/client", productController.getClientProduct);
route.get("/client/:productId", productController.getClientProductById);
route.post(
  "/admin",
  userController.protectRoute,
  userController.restrictTo("admin"),
  upload.array("img", 4),
  productController.createProduct
);
route
  .route("/admin/:productId")
  .patch(
    userController.protectRoute,
    userController.restrictTo("admin"),
    productController.updateProduct
  )
  .delete(
    userController.protectRoute,
    userController.restrictTo("admin"),
    productController.deleteProduct
  );
module.exports = route;
