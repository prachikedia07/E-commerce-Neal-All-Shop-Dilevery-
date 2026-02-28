const Product = require("../models/product");

/* ===============================
   CREATE PRODUCT
================================ */
exports.createProduct = async (req, res) => {
  try {
    const { name, price, discountedPrice, category, stock, image } =
      req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        message: "Name, price and category are required",
      });
    }

    const product = await Product.create({
      vendor: req.user._id,
      name,
      price,
      discountedPrice,
      category,
      stock: stock ?? 0,
      image,
      isAvailable: stock > 0,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Server error while creating product" });
  }
};

/* ===============================
   GET ALL PRODUCTS (Vendor)
================================ */
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({
      vendor: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   UPDATE PRODUCT
================================ */
exports.updateProduct = async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    vendor: req.user._id,
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, price, discountedPrice, category, stock, isAvailable } =
    req.body;

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (discountedPrice !== undefined)
    product.discountedPrice = discountedPrice;
  if (category !== undefined) product.category = category;
  if (stock !== undefined) product.stock = stock;
  if (isAvailable !== undefined) product.isAvailable = isAvailable;

  if (product.stock === 0) {
    product.isAvailable = false;
  }

  await product.save();

  res.json({
    success: true,
    product,
  });
};

/* ===============================
   DELETE PRODUCT (Hard Delete)
================================ */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};