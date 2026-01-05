import express from "express";
import upload from "../configs/multer.js";
import {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), updateProduct);
router.post("/", upload.single("image"), addProduct); // 👈 ADD THIS
router.delete("/:id", deleteProduct);

export default router;
