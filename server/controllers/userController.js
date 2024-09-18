const AppError = require("../appError");
const User = require("../models/user");
const Product = require("../models/product");
const { catchAsync } = require("../utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const path = require("path");
const mongoose = require("mongoose");

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const sendToken = (user, statusCode, req, res) => {
  const token = signInToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });
  user.password = undefined;
  user._id = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};
const getUserByToken = async (token) => {
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  return user;
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  sendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please fill your email or password input", 400));
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(
      new AppError("Your email or password is wrong! Please try again", 401)
    );
  const token = signInToken(user._id);
  sendToken(user, 200, req, res);
});
exports.logout = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: false,
  });
  res.json({ message: "log out success!" });
};
exports.autoLogin = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(404).json({ message: "No user found!" });
  const user = await getUserByToken(token);
  if (req.headers.origin === "http://localhost:3001" && user.role === "user")
    return next(new AppError("Your token cant access this page!"));
  res.status(200).json({ data: { user } });
};
exports.addOneProductToCart = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { qty } = req.body;
  const product = await Product.findById(productId);
  if (product.count < qty)
    return next(new AppError("This product doesnt have enough quantity!"));
  const hasProduct = req.user.cart.find(
    (product) => product.product.toString() === productId
  );
  if (!hasProduct) {
    if (qty > 0)
      req.user.cart.push({
        product: new mongoose.Types.ObjectId(productId),
        qty,
      });
  } else {
    hasProduct.qty += qty;

    if (hasProduct.qty === 0)
      req.user.cart = req.user.cart.filter(
        (product) => product.product.toString() !== productId
      );
  }
  await req.user.save();
  res.status(200).json({ status: "success", message: "Add to cart success!" });
});
exports.getCart = catchAsync(async (req, res, next) => {
  const user = await req.user.populate("cart.product");
  const cart = user.cart;
  const total = cart.reduce(
    (acc, product) => acc + product.product.price * product.qty,
    0
  );
  res.status(200).json({ data: { cart, total } });
});
exports.deleteOneProductFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  req.user.cart = req.user.cart.filter(
    (product) => product.product._id.toString() !== productId
  );
  await req.user.save();
  res.status(204).json({ message: "delete success!" });
});
//Middleware protect route
exports.protectRoute = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next(new AppError("Please loggin to access", 401));
  const user = await getUserByToken(token);
  req.user = user;
  next();
});
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // admin, user, saler
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

//Admin
exports.adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please fill your email or password input", 400));
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(
      new AppError("Your email or password is wrong! Please try again", 401)
    );
  if (user.role === "user")
    return next(new AppError("You are not allow to login this page"));
  const token = signInToken(user._id);
  console.log(user);
  sendToken(user, 200, req, res);
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  let { page } = req.query;
  if (!page) page = 1;
  const get8Users = (users, page) => {
    return users
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice((page - 1) * 8, page * 8);
  };
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users: get8Users(users, page),
      totalPage: Math.ceil(users.length / 8),
    },
  });
  res.status(200).json({ status: "success", data: { user } });
});
