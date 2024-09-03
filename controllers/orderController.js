const catchAsync = require("../utils/catchAsync");
const Order = require('../models/orderModel');
const Product = require("../models/productModel");
const User = require("../models/userModel");

exports.fetchOrdersByUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  const orders = await Order.find({ user: id });
  res.status(200).json(orders);
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create(req.body);
  //TODO:here we have to update stocks //done
  for (let item of order.items) {
    let product = await Product.findById({ id: item.product.id });
    product.$inc("stock", -1 * item.quantity);
    await product.save();
  }

  const user = await User.findById(order.user);

  res.status(200).json(order);
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);
  res.status(200).json(order);
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(order);
});

// exports.fetchAllOrders = catchAsync(async (req, res, next) => {});
