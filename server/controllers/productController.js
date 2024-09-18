const AppError = require("../appError");
const Product = require("../models/product");
const { catchAsync } = require("../utils");

exports.getClientProduct = catchAsync(async (req, res) => {
  const products = await Product.find();
  let { search } = req.query;
  if (!search) search = "";
  const result = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  res.status(200).json({ status: "success", data: result });
});

exports.getClientProductById = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product)
    return next(new AppError(`cant find product with that id`, 404));
  res.status(200).json({ status: "success", data: { product } });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, category, price, short_desc, long_desc, count } = req.body;
  const domain = `${req.protocol}://${req.get("host")}`;
  const newProduct = {
    name,
    category,
    price,
    short_desc,
    long_desc,
    count,
    img1: `${domain}/img/product/${req.files[0].filename}`,
    img2: `${domain}/img/product/${req.files[1].filename}`,
    img3: `${domain}/img/product/${req.files[2].filename}`,
    img4: `${domain}/img/product/${req.files[3].filename}`,
  };
  await Product.create(newProduct);
  console.log(newProduct);
  res.status(201).json({ status: "success", data: { product: newProduct } });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { name, category, price, short_desc, long_desc, count } = req.body;
  const updateProduct = { name, category, price, short_desc, long_desc, count };
  const { productId } = req.params;
  await Product.findByIdAndUpdate(productId, updateProduct);
  res.status(200).json({ status: "success" });
});
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);
  res.status(204).json({ message: "delete success" });
});
