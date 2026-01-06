import Product from "../models/Product.js";
import cloudinary from "../configs/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!name || !description || !price || !category || stock===undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    const upload = await cloudinary.uploader.upload(req.file.path);

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image: upload.secure_url,
      cloudinary_id: upload.public_id
    });

    res.status(201).json(product);

  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (req.file) {
    await cloudinary.uploader.destroy(product.cloudinary_id);
    const upload = await cloudinary.uploader.upload(req.file.path);
    product.image = upload.secure_url;
    product.cloudinary_id = upload.public_id;
  }

  Object.assign(product, req.body);
  await product.save();
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  await cloudinary.uploader.destroy(product.cloudinary_id);
  await product.deleteOne();
  res.json({ message: "Product deleted" });
};
