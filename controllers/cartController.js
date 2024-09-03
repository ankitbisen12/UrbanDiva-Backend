const Cart = require("../models/cartModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchCartByUserId = catchAsync(async (req, res) => {
  const { id } = req.user;
  const cartItems = await Cart.find({ user: id }).populate("product");
  res.status(200).json(cartItems);
});

exports.addToCart = catchAsync(async (req, res) => {
  const { id } = req.user;
  console.log("req.body",req.body);
  const newItemToCart = await Cart.create({ ...req.body, user: id });
  const result = await newItemToCart.populate("product");
  res.status(200).json(result);
});

exports.deleteFromCart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const doc = await Cart.findByIdAndDelete(id);
  res.status(200).json(doc);
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const cart = await Cart.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  const result = await cart.populate("product");
  res.status(200).json(result);
});
