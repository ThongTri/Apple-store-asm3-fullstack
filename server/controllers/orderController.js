const nodemailer = require("nodemailer");

const Order = require("../models/order");
const User = require("../models/user");
const AppError = require("../appError");
const Product = require("../models/product");
const { catchAsync } = require("../utils");
const { orderEmail } = require("../htmlTemplate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "triphtfx22521@funix.edu.vn",
    pass: "xTWMB7yZYw5x",
  },
});
exports.createOrder = catchAsync(async (req, res, next) => {
  const { address } = req.body;
  if (!address) return next(new AppError("Please fill your address", 400));
  const copyOfCart = req.user.cart.map((item) => ({
    product: item.product,
    qty: item.qty,
  })); // unpopulate
  const user = await req.user.populate("cart.product");
  const cart = user.cart;
  const total = cart.reduce(
    (acc, product) => acc + product.product.price * product.qty,
    0
  );
  const newOrder = {
    user: req.user._id,
    address,
    cart: copyOfCart,
    total,
  };
  const order = await Order.create(newOrder);
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.count - cart[i].qty < 0)
      return next(new AppError("Product is not enough quantiy!"));
    await Product.findByIdAndUpdate(cart[i].product._id, {
      count: cart[i].product.count - cart[i].qty,
    });
  }

  // send email
  let mailOptions = {
    from: "triphtfx22521@funix.edu.vn",
    to: req.user.email,
    subject: "Order success",
    html: orderEmail(user, address, total, new Date(Date.now())),
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error occurred:", err);
      return res
        .status(500)
        .json({ status: "fail", message: "Failed to send email" });
    }
    console.log("Email sent: " + info.response);
  });
  req.user.cart = [];
  await req.user.save();
  res.status(200).json({ status: "success", data: { newOrder } });
});
exports.getClientOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({ status: "success", data: { orders } });
});
exports.getClientDetailOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate("cart.product");
  res.status(200).json({ status: "success", data: { order } });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  let { page } = req.query;
  if (!page) page = 1;
  const get8Orders = (orders, page) => {
    return orders
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice((page - 1) * 8, page * 8);
  };
  const orders = await Order.find().populate("user").populate("cart.product");
  const user = await User.find({ role: "user" });
  const thisMonth = new Date(Date.now()).getMonth();
  const earning = orders.reduce((acc, order) => {
    if (order.createdAt.getMonth() === thisMonth) return acc + order.total;
    else return acc;
  }, 0);
  res.status(200).json({
    status: "success",
    data: {
      orders: get8Orders(orders, page),
      earning,
      orderQty: orders.length,
      userQty: user.length,
    },
  });
});
