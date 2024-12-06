import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js"; // 添加这行
import { sendOrderConfirmationEmail } from "../utills/emailService.js";
// create the order
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  }

  try {
    // update the number of products
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }

      if (product.countInStock < item.qty) {
        throw new Error(`Product ${product.name} is out of stock`);
      }
      product.countInStock -= item.qty;
      await product.save();
    }

    const orderData = {
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    console.log("Creating order with data:", orderData);

    const order = new Order(orderData);
    const createdOrder = await order.save();

    if (createdOrder) {
      res.status(201).json(createdOrder);
    } else {
      throw new Error("Failed to create order");
    }
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(400);
    throw new Error(`Failed to create order: ${error.message}`);
  }
});

// read all the orders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

// read the order for the specific user
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// read the order for current user
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// update the order
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "email");

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    // sent the email
    try {
      await sendOrderConfirmationEmail(updatedOrder);
      console.log("Order confirmation email sent successfully");
    } catch (error) {
      console.error("Failed to send order confirmation email:", error);
    }

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  // Create
  addOrderItems,
  // Read
  getOrders,
  getOrderById,
  getMyOrders,
  // Update
  updateOrderToPaid,
  updateOrderToDelivered,
};
