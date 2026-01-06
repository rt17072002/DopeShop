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
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "https://dope-shop.vercel.app",
//   "https://dope-shop-admin.vercel.app"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true); // Postman, server-to-server

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true
//   })
// );

app.use(express.json());


app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use("/",(req,res)=>res.send("Api working"))

// console.log("Razorpay key loaded:", process.env.RAZORPAY_KEY_ID);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
