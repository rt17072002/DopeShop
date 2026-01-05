import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  items: [{ 
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  paymentMethod:{
    type: String,
    enum: ["COD", "Online"],
    default: "Online"
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing"
  },
  razorpay_order_id: String,
  razorpay_payment_id: String
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
