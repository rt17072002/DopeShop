import express from "express";
import {
  placeNewOrder,
  getAllOrders,
  getOrderById,
  updateStatusOfOrder,
  deleteOrder,
  placeOrderCod,
  verifyRazorpayPayment,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeNewOrder);
router.post("/cod", placeOrderCod);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/verify", verifyRazorpayPayment)
router.put("/:id/status", updateStatusOfOrder);
router.delete("/:id", deleteOrder);

export default router;
