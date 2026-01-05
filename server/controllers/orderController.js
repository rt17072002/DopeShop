import Razorpay from "razorpay";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import "dotenv/config";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const placeOrderCod = async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!customer || !items || !items.length) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.id);

      if (!product || product.stock < item.q) {
        return res.status(400).json({
          message: `${product?.name || "Product"} out of stock`
        });
      }

      // Deduct stock
      product.stock -= item.q;
      await product.save();

      // Snapshot product details
      item.name = product.name;
      item.price = product.price;

      totalAmount += product.price * item.q;
    }

    const order = await Order.create({
      customer,
      items,
      totalAmount,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      orderStatus: "Processing"
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully (Cash on Delivery)",
      order
    });

  } catch (error) {
    console.error("COD Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const placeNewOrder = async (req, res) => {
  const { customer, items } = req.body;

  let totalAmount = 0;

  for (const item of items) {
    const product = await Product.findById(item.id);
    if (!product || product.stock < item.q) {
      return res.status(400).json({ message: "Product out of stock" });
    }
    product.stock -= item.q;
    await product.save();

    item.name = product.name;
    item.price = product.price;
    item.quantity = item.q;
    totalAmount += product.price * item.q;
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: totalAmount * 100,
    currency: "INR"
  });

  const order = await Order.create({
    customer,
    items,
    totalAmount,
    razorpay_order_id: razorpayOrder.id
  });

  res.json({ order, razorpayOrder });
};

export const verifyRazorpayPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSign !== razorpay_signature) {
    return res.status(400).json({ success: false });
  }

  await Order.findByIdAndUpdate(orderId, {
    paymentStatus: "Paid",
    razorpay_payment_id
  });

  res.json({ success: true , orderId, razorpay_order_id});
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

export const updateStatusOfOrder = async (req, res) => {
  // const {  paymentStatus } = req.body;
  const { orderStatus } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (orderStatus) order.orderStatus = orderStatus;
  // if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();

  res.json({
    message: "Order status updated",
    order
  });
};

export const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Restore stock
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.q;
      await product.save();
    }
  }

  await order.deleteOne();

  res.json({ message: "Order deleted successfully" });
};
