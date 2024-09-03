const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  //storing the discountedPrice on the basis of discountPercentage dynamically
  newProduct.discountPrice = Math.round(
    newProduct.price * (1 - newProduct.discountPercentage / 100)
  );

  // console.log(newProduct);

  let product = await newProduct.save();

  res.status(201).json({
    status: "success",
    product,
  });
});

exports.fetchAllProducts = catchAsync(async (req, res, next) => {
  const Products = await Product.find();

  res.status(200).json(Products);
});

exports.fetchProductById = catchAsync(async (req, res, next) => {
  //extracting id from request object
  const { id } = req.params;
  const product = await Product.findById(id);
  res.status(200).json(product);
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  product.discountPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );
  const updatedProduct = await product.save();

  res.status(200).json({
    status: "success",
    data: {
      updatedProduct,
    },
  });
});
