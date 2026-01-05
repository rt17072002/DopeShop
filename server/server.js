import dotenv from "dotenv/config";
// dotenv.config();
import express from "express";
import connectDB from "./configs/connectDB.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors"

await connectDB();

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

console.log("Razorpay key loaded:", process.env.RAZORPAY_KEY_ID);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
